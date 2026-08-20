import tkinter as tk
from tkinter import ttk, scrolledtext, filedialog
import threading
import os
import base64
import pythoncom
import win32com.client
from pptx import Presentation
from pptx.enum.shapes import MSO_SHAPE_TYPE
from deep_translator import GoogleTranslator

class PPTXTranslatorApp(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Traducteur & Extracteur PPTX - Bell'O du Lac")
        self.geometry("700x820")
        self.configure(padx=20, pady=10)

        # ==========================================
        # SECTION 1 : CONFIGURATION (Fichier & Langues)
        # ==========================================
        frame_src = tk.LabelFrame(self, text=" ⚙️ Configuration ", font=("Arial", 11, "bold"), padx=15, pady=10)
        frame_src.pack(fill="x", pady=5)

        tk.Label(frame_src, text="Fichier source (FR) :").pack(anchor="w")
        self.source_entry = tk.Entry(frame_src, width=50)
        self.source_entry.insert(0, "flyers.pptx")
        self.source_entry.pack(fill="x", pady=(0, 15))

        tk.Label(frame_src, text="Langues à générer :").pack(anchor="w")
        
        self.lang_vars = {
            "en": tk.BooleanVar(value=True),
            "de": tk.BooleanVar(value=True),
            "nl": tk.BooleanVar(value=True),
            "es": tk.BooleanVar(value=True),
            "it": tk.BooleanVar(value=True),
            "da": tk.BooleanVar(value=True),
            "sv": tk.BooleanVar(value=True)
        }
        
        lang_frame1 = tk.Frame(frame_src)
        lang_frame1.pack(fill="x")
        tk.Checkbutton(lang_frame1, text="Anglais (EN)", variable=self.lang_vars["en"]).pack(side="left", padx=5)
        tk.Checkbutton(lang_frame1, text="Allemand (DE)", variable=self.lang_vars["de"]).pack(side="left", padx=5)
        tk.Checkbutton(lang_frame1, text="Néerlandais (NL)", variable=self.lang_vars["nl"]).pack(side="left", padx=5)
        tk.Checkbutton(lang_frame1, text="Espagnol (ES)", variable=self.lang_vars["es"]).pack(side="left", padx=5)

        lang_frame2 = tk.Frame(frame_src)
        lang_frame2.pack(fill="x", pady=(5, 10))
        tk.Checkbutton(lang_frame2, text="Italien (IT)", variable=self.lang_vars["it"]).pack(side="left", padx=5)
        tk.Checkbutton(lang_frame2, text="Danois (DA)", variable=self.lang_vars["da"]).pack(side="left", padx=5)
        tk.Checkbutton(lang_frame2, text="Suédois (SV)", variable=self.lang_vars["sv"]).pack(side="left", padx=5)

        tk.Label(frame_src, text="Autres langues (ex: pt, ru, pl) :").pack(anchor="w")
        self.other_langs_entry = tk.Entry(frame_src, width=50)
        self.other_langs_entry.pack(fill="x", pady=(0, 5))

        # ==========================================
        # SECTION 2 : ACTIONS
        # ==========================================
        frame_actions = tk.LabelFrame(self, text=" ⚡ Actions ", font=("Arial", 11, "bold"), padx=15, pady=10)
        frame_actions.pack(fill="x", pady=5)

        self.btn_all = tk.Button(frame_actions, text="🚀 TOUT GÉNÉRER D'UN COUP (Traduction + Images + Base64)", 
                                 bg="#9C27B0", fg="white", font=("Arial", 10, "bold"), command=self.start_generate_all)
        self.btn_all.pack(fill="x", pady=(0, 15))
        
        ttk.Separator(frame_actions, orient='horizontal').pack(fill='x', pady=5)
        tk.Label(frame_actions, text="Ou en deux étapes (si vous souhaitez corriger le texte entre temps) :", font=("Arial", 9, "italic")).pack(anchor="w", pady=(5, 5))

        self.btn_translate = tk.Button(frame_actions, text="1. Générer uniquement les PPTX", 
                                       bg="#2196F3", fg="white", font=("Arial", 9, "bold"), command=self.start_translation)
        self.btn_translate.pack(fill="x", pady=5)

        export_frame = tk.Frame(frame_actions)
        export_frame.pack(fill="x", pady=5)
        self.export_entry = tk.Entry(export_frame)
        self.export_entry.pack(side="left", fill="x", expand=True, padx=(0, 10))
        tk.Button(export_frame, text="Parcourir...", command=self.browse_file).pack(side="right")
        
        self.btn_export = tk.Button(frame_actions, text="2. Exporter Images & Base64 du PPTX sélectionné", 
                                    bg="#4CAF50", fg="white", font=("Arial", 9, "bold"), command=self.start_export)
        self.btn_export.pack(fill="x", pady=5)

        # ==========================================
        # SECTION 3 : CONSOLE
        # ==========================================
        tk.Label(self, text="Journal d'activité :", font=("Arial", 10, "bold")).pack(anchor="w")
        self.console = scrolledtext.ScrolledText(self, height=10, bg="#f4f4f4")
        self.console.pack(fill="both", expand=True)

    def log(self, message):
        self.console.insert(tk.END, message + "\n")
        self.console.see(tk.END)
        self.update_idletasks()

    def browse_file(self):
        filename = filedialog.askopenfilename(filetypes=[("PowerPoint", "*.pptx")])
        if filename:
            self.export_entry.delete(0, tk.END)
            self.export_entry.insert(0, filename)

    def set_buttons_state(self, state):
        self.btn_all.config(state=state)
        self.btn_translate.config(state=state)
        self.btn_export.config(state=state)

    def get_selected_langs(self):
        langs = [code for code, var in self.lang_vars.items() if var.get()]
        other_langs = self.other_langs_entry.get().strip()
        if other_langs:
            langs.extend([lang.strip() for lang in other_langs.split(",") if lang.strip()])
        return [l.lower() for l in langs]

    # --- NOYAU DE TRADUCTION AVEC GESTION DES ESPACES ---
    def translate_text(self, text, target_lang):
        if not text or not text.strip(): return text
        if not any(c.isalpha() for c in text): return text
        
        # 1. Capture mathématique des espaces de début et de fin
        len_leading = len(text) - len(text.lstrip())
        len_trailing = len(text) - len(text.rstrip())
        
        prefix = text[:len_leading] if len_leading > 0 else ""
        suffix = text[-len_trailing:] if len_trailing > 0 else ""
        
        # 2. Le texte "pur" à envoyer au traducteur
        core_text = text.strip()
        
        try:
            translated = GoogleTranslator(source='fr', target=target_lang).translate(core_text)
            if translated:
                # 3. On recolle les espaces initiaux autour de la traduction
                return prefix + translated + suffix
            return text
        except Exception as e:
            self.log(f"  [!] Erreur traduction sur '{text}': {e}")
            return text

    def explore_and_translate_shape(self, shape, target_lang):
        if shape.shape_type == MSO_SHAPE_TYPE.GROUP:
            for sub_shape in shape.shapes:
                self.explore_and_translate_shape(sub_shape, target_lang)
        elif shape.has_table:
            for row in shape.table.rows:
                for cell in row.cells:
                    for paragraph in cell.text_frame.paragraphs:
                        for run in paragraph.runs:
                            translated = self.translate_text(run.text, target_lang)
                            if translated: run.text = translated
        elif shape.has_text_frame:
            for paragraph in shape.text_frame.paragraphs:
                for run in paragraph.runs:
                    translated = self.translate_text(run.text, target_lang)
                    if translated: run.text = translated

    def perform_translation(self, source_file, target_lang):
        self.log(f"\n🔄 Traduction vers {target_lang.upper()} en cours...")
        try:
            prs = Presentation(source_file)
            for slide in prs.slides:
                for shape in slide.shapes:
                    self.explore_and_translate_shape(shape, target_lang)
            
            base_name, _ = os.path.splitext(source_file)
            output_pptx = f"{base_name}_{target_lang.upper()}.pptx"
            prs.save(output_pptx)
            self.log(f"✅ Fichier créé : {output_pptx}")
            return output_pptx
        except Exception as e:
            self.log(f"❌ Erreur lors de la traduction : {e}")
            return None

    # --- NOYAU D'EXPORT ---
    def generate_base64_from_jpg(self, jpg_path):
        txt_path = jpg_path.replace(".jpg", "_base64.txt")
        try:
            with open(jpg_path, "rb") as img_file:
                b64_string = base64.b64encode(img_file.read()).decode('utf-8')
            with open(txt_path, "w", encoding="utf-8") as txt_file:
                txt_file.write(f"data:image/jpeg;base64,{b64_string}")
        except Exception as e:
            self.log(f"  [!] Erreur Base64 : {e}")

    def perform_export(self, ppt_app, pptx_path):
        self.log(f"📸 Export des objets depuis : {os.path.basename(pptx_path)}")
        abs_pptx_path = os.path.abspath(pptx_path)
        abs_dir = os.path.dirname(abs_pptx_path)
        base_name, _ = os.path.splitext(os.path.basename(pptx_path))

        try:
            presentation = ppt_app.Presentations.Open(abs_pptx_path, WithWindow=False)
            for slide_idx, slide in enumerate(presentation.Slides, start=1):
                jpg_filename = f"{base_name}_slide{slide_idx}.jpg"
                abs_jpg_path = os.path.join(abs_dir, jpg_filename)
                try:
                    shape_range = slide.Shapes.Range()
                    shape_range.Export(abs_jpg_path, 1) # 1 = Filtre JPG
                    self.log(f"  ✅ Image exportée : {jpg_filename}")
                    self.generate_base64_from_jpg(abs_jpg_path)
                except Exception as e:
                    self.log(f"  [!] Erreur sur le slide {slide_idx} : {e}")
            presentation.Close()
        except Exception as e:
            self.log(f"❌ Erreur d'ouverture dans PowerPoint : {e}")

    # --- THREADS D'EXECUTION ---
    def start_generate_all(self):
        self.set_buttons_state("disabled")
        self.console.delete(1.0, tk.END)
        threading.Thread(target=self.generate_all_task, daemon=True).start()

    def generate_all_task(self):
        pythoncom.CoInitialize()
        ppt_app = None
        try:
            source = self.source_entry.get().strip()
            if not os.path.exists(source):
                self.log(f"❌ Fichier source '{source}' introuvable.")
                return

            langs = self.get_selected_langs()
            if not langs:
                self.log("❌ Veuillez sélectionner au moins une langue.")
                return

            self.log("🔧 Démarrage de PowerPoint en arrière-plan...")
            ppt_app = win32com.client.Dispatch("PowerPoint.Application")

            for lang in langs:
                self.log(f"\n=============================================")
                self.log(f"🚀 TRAITEMENT COMPLET : {lang.upper()}")
                self.log(f"=============================================")
                
                # 1. Traduction
                out_pptx = self.perform_translation(source, lang)
                
                # 2. Export si traduction réussie
                if out_pptx:
                    self.perform_export(ppt_app, out_pptx)

            self.log("\n🎉 TOUT EST TERMINÉ ! Images et Base64 générés avec succès. 🎉")

        except Exception as e:
            self.log(f"\n❌ Erreur inattendue : {e}")
        finally:
            if ppt_app:
                try: ppt_app.Quit()
                except: pass
            pythoncom.CoUninitialize()
            self.set_buttons_state("normal")

    def start_translation(self):
        self.set_buttons_state("disabled")
        self.console.delete(1.0, tk.END)
        threading.Thread(target=self.translation_only_task, daemon=True).start()

    def translation_only_task(self):
        try:
            source = self.source_entry.get().strip()
            if not os.path.exists(source):
                self.log(f"❌ Fichier '{source}' introuvable.")
                return

            langs = self.get_selected_langs()
            if not langs: return

            for lang in langs:
                self.perform_translation(source, lang)
                
            self.log("\n🎉 Traduction terminée ! Éditez les PPTX avant l'étape 2.")
        except Exception as e:
            self.log(f"\n❌ Erreur : {e}")
        finally:
            self.set_buttons_state("normal")

    def start_export(self):
        self.set_buttons_state("disabled")
        self.console.delete(1.0, tk.END)
        threading.Thread(target=self.export_only_task, daemon=True).start()

    def export_only_task(self):
        pythoncom.CoInitialize()
        ppt_app = None
        try:
            filepath = self.export_entry.get().strip()
            if not os.path.exists(filepath):
                self.log(f"❌ Fichier à exporter '{filepath}' introuvable.")
                return

            ppt_app = win32com.client.Dispatch("PowerPoint.Application")
            self.perform_export(ppt_app, filepath)
            self.log("\n🎉 Export terminé avec succès !")
        except Exception as e:
            self.log(f"\n❌ Erreur : {e}")
        finally:
            if ppt_app:
                try: ppt_app.Quit()
                except: pass
            pythoncom.CoUninitialize()
            self.set_buttons_state("normal")

if __name__ == "__main__":
    app = PPTXTranslatorApp()
    app.mainloop()