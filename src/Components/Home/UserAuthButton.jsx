export default function UserAuthButton({ currentUser, onLogin, onLogout }) {
  return (
    <>
      {currentUser ? (
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-10 flex items-center gap-4">
          <span className="text-white text-sm md:text-base">
            Welcome, {currentUser.username}!
          </span>
          <button 
            onClick={onLogout}
            className="bg-[#8B3A3A] hover:bg-[#A04444] text-white px-4 py-2 md:px-8 md:py-3 text-sm md:text-base font-bold tracking-wider transition-colors"
          >
            LOG OUT
          </button>
        </div>
      ) : (
        <button 
          onClick={onLogin}
          className="absolute top-4 right-4 md:top-8 md:right-8 bg-[#8B3A3A] hover:bg-[#A04444] text-white px-4 py-2 md:px-8 md:py-3 text-sm md:text-base font-bold tracking-wider z-10 transition-colors"
        >
          LOG IN
        </button>
      )}
    </>
  );
}
