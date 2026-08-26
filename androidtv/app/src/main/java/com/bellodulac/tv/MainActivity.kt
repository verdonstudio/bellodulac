package com.bellodulac.tv

import android.annotation.SuppressLint
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.KeyEvent
import android.view.View
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.ProgressBar
import androidx.appcompat.app.AppCompatActivity
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL
import java.util.concurrent.Executors

/**
 * App TV "kiosk" : affiche une simple WebView plein ecran pointant vers l'URL
 * du site bellodulac.
 *
 * Au demarrage, l'appli va chercher un petit fichier JSON de configuration sur
 * GitHub (BuildConfig.CONFIG_URL, different par variante salles/moustiers) qui
 * contient juste : {"url": "https://bellodulac.vercel.app/home.html?..."}
 *
 * Ca permet de changer l'URL affichee (langue, logement, etc.) simplement en
 * editant ce fichier directement sur GitHub, sans jamais avoir a reconstruire
 * ou reinstaller l'application.
 *
 * Si le fichier de config est injoignable (pas de reseau au demarrage, fichier
 * absent, JSON invalide...), l'appli affiche BuildConfig.DEFAULT_URL a la place.
 */
class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView
    private lateinit var progress: ProgressBar
    private val mainHandler = Handler(Looper.getMainLooper())
    private val ioExecutor = Executors.newSingleThreadExecutor()

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        hideSystemUi()

        webView = findViewById(R.id.webview)
        progress = findViewById(R.id.progress)

        with(webView.settings) {
            javaScriptEnabled = true
            domStorageEnabled = true
            loadWithOverviewMode = true
            useWideViewPort = true
            builtInZoomControls = false
            displayZoomControls = false
            cacheMode = android.webkit.WebSettings.LOAD_DEFAULT
            mediaPlaybackRequiresUserGesture = false
        }

        webView.webViewClient = object : WebViewClient() {
            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                progress.visibility = View.GONE
            }
        }

        loadConfiguredUrl()
    }

    override fun onWindowFocusChanged(hasFocus: Boolean) {
        super.onWindowFocusChanged(hasFocus)
        if (hasFocus) hideSystemUi()
    }

    @Suppress("DEPRECATION")
    private fun hideSystemUi() {
        window.decorView.systemUiVisibility = (
            View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                or View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                or View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                or View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                or View.SYSTEM_UI_FLAG_FULLSCREEN
                or View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
            )
    }

    /**
     * Va chercher BuildConfig.CONFIG_URL en tache de fond, avec un timeout court,
     * puis charge l'URL trouvee (ou l'URL par defaut en cas d'echec).
     */
    private fun loadConfiguredUrl() {
        ioExecutor.execute {
            val resolvedUrl = try {
                fetchConfigUrl(BuildConfig.CONFIG_URL) ?: BuildConfig.DEFAULT_URL
            } catch (t: Throwable) {
                BuildConfig.DEFAULT_URL
            }
            mainHandler.post {
                webView.loadUrl(resolvedUrl)
            }
        }
    }

    private fun fetchConfigUrl(configUrl: String): String? {
        val connection = URL(configUrl).openConnection() as HttpURLConnection
        return try {
            connection.connectTimeout = 8000
            connection.readTimeout = 8000
            connection.requestMethod = "GET"
            if (connection.responseCode !in 200..299) return null
            val body = connection.inputStream.bufferedReader().use { it.readText() }
            val json = JSONObject(body)
            val url = json.optString("url", "")
            if (url.startsWith("http")) url else null
        } finally {
            connection.disconnect()
        }
    }

    /** Mode kiosk : le bouton retour navigue dans la WebView plutot que de quitter l'appli. */
    override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
        if (keyCode == KeyEvent.KEYCODE_BACK && webView.canGoBack()) {
            webView.goBack()
            return true
        }
        return super.onKeyDown(keyCode, event)
    }

    override fun onDestroy() {
        ioExecutor.shutdownNow()
        super.onDestroy()
    }
}
