export default function LandingPage() {
  return (
    <div>
      <div className="h-dvh bg-gradient-to-br from-emerald-300 flex flex-col items-center">
        <div className="h-28 w-full px-9 flex items-center justify-between">
          <div className="h-full py-3.5 items-center flex justify-between">
            <img src="/images/logo.png" alt="Fiscal logo" className="h-full" />
            <h1 className="text-5xl px-2 font-bold text-black">
              Fiscal Friend
            </h1>
          </div>
          <button className="px-4 py-2 rounded-lg bg-emerald-500 text-emerald-950 hover:bg-emerald-700 text-2xl font-medium">
            <a href="/login">Login</a>
          </button>
        </div>
        <div className="flex w-full items-center justify-evenly">
          <div className="h-full flex flex-col justify-center text-center">
            <div>
              <h1 className="text-5xl mb-1 font-bold text-black">Welcome to</h1>
              <h1 className="text-5xl font-bold text-black">
                The Friend Group
              </h1>
              <button className="px-10 py-2 mt-6 rounded-lg bg-emerald-500 text-emerald-950 hover:bg-emerald-700 text-2xl font-medium">
                <a href="/signup">Sign Up</a>
              </button>
            </div>
            <div className="h-1/5"></div>
          </div>
          <div className="h-5/6">
            <img
              src="/images/logo_w_text.png"
              alt="Fiscal logo"
              className="h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
