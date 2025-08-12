import "@/styles/globals.css";
import ThemeProvider from "@/Context/theme-provider";
export default function App({ Component, pageProps }) {
  return (
    <div className="px-3 md:px-30 lg:px-50 py-5 font-dana dark:bg-[#242A38]">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  );
}
