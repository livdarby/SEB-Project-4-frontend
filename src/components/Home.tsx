import { Link, useNavigate } from "react-router-dom";

function Home({ user }: any) {
  return (
    <>
      <section className="bg-[#d3ecfb] h-screen">
        {user && (
          <h1 className="mt--2 text-center text-3xl tracking-wide py-10 font-marker tracking-widest text-[#1884ef]">
            Welcome, {user.username}
          </h1>
        )}
        {!user && (
          <h1 className="mt--2 text-center text-3xl tracking-wide py-10 font-marker tracking-widest text-[#1884ef]">
            Sign up today
          </h1>
        )}
        <div className="my-10 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="md:shrink-0">
              <img
                className="h-48 w-full object-cover md:h-full md:w-48"
                src="../../assets/bg.avif"
                alt="Premier League stock photo"
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-[#e55829] font-semibold">
                About us
              </div>
              <p className="mt-2 text-slate-500">
                Challenge your friends to forecast match outcomes, climb the
                leaderboard, and claim the title of ultimate Premier League
                predictor. Join now and elevate your football fandom experience!
              </p>
            </div>
          </div>
        </div>
        <div className="my-10 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-[#e55829] font-semibold">
                how to
              </div>
              <p className="mt-2 text-slate-500">
                Visit the Predictions tab to input forecasts for the upcoming
                Match Week before the deadline. Review match outcomes and keep
                track of your league performance in real-time via the
                Leaderboard.
              </p>
            </div>
            <div className="md:shrink-0">
              <img
                className="h-48 w-full object-cover md:h-full md:w-48"
                src="../../assets/bg2.webp"
                alt="Premier League stock photo"
              />
            </div>
          </div>
        </div>
        <div className="my-10 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="md:shrink-0">
              <img
                className="h-48 w-full object-cover md:h-full md:w-48"
                src="../../assets/pllogo.jpeg"
                alt="Premier League stock photo"
              />
            </div>
            <div className="p-8 ">
              <div className="uppercase tracking-wide text-sm text-[#e55829] font-semibold">
                resources
              </div>
              <p className="mt-2 text-slate-500">
                Visit{" "}
                <a
                  className="underline text-indigo-800 hover:text-[#69c0f0]"
                  href="https://www.premierleague.com/stats"
                  target="_blank"
                >
                  Premier League Stats Centre
                </a>
                ,{" "}
                <a
                  className="underline text-indigo-800 hover:text-[#69c0f0]"
                  target="_blank"
                  href="https://www.skysports.com/football/teams"
                >
                  Sky Sports
                </a>{" "}
                and{" "}
                <a
                  className="underline text-indigo-800 hover:text-[#69c0f0]"
                  target="_blank"
                  href="https://www.bbc.co.uk/sport/football/premier-league"
                >
                  BBC Sport
                </a>{" "}
                for the latest player and club stats to inform your predictions.
              </p>
            </div>
          </div>
        </div>
        <p className="text-center text-xs uppercase tracking-wide font-bold text-gray-700">
          &copy;2024 Premier Picks. An app by liv darby.
        </p>
      </section>
    </>
  );
}

export default Home;
