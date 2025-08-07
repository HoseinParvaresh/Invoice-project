import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="px-3 md:px-30 lg:px-50 py-5 font-dana">
      <Component {...pageProps} />
    </div>
  );
}
