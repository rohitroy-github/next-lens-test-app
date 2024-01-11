import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white p-4">
      <div className="container mx-auto flex justify-center">
        <Link href="/">
          <p className="text-black font-montserrat mr-4">Home</p>
        </Link>
        <Link href="/profile">
          <p className="text-black font-montserrat mr-4">Profile</p>
        </Link>
        <Link href="/recommended-profiles">
          <p className="text-black font-montserrat">Recommended Profiles</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
