import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="px-20 py-5 font-dana">
      <Component {...pageProps} />
    </div>
  );
}
