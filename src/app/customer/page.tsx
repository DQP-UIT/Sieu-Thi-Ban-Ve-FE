import HomePage from "../home/page";
import { FaFacebook, FaGlobe, FaUserFriends } from "react-icons/fa";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      {/* Main Content */}
      <main className="flex flex-wrap gap-[32px] row-start-2 items-center sm:items-start w-full min-w-fit">
        <HomePage />
      </main>

      {/* Footer */}
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook className="text-blue-600" />
          Facebook
        </a>

        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://zalo.me"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaUserFriends className="text-[#0084ff]" />
          Zalo
        </a>

        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGlobe className="text-blue-500" />
          LinkedIn
        </a>
      </footer>
    </div>
  );
}
