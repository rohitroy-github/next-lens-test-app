import {useState, useEffect} from "react";
import {recommendProfiles, urqlClient} from "../api";
import Link from "next/link";

const truncateBio = (bio, maxWords) => {
  if (!bio) return "No Bio";
  const words = bio.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + "...";
  }
  return bio;
};

const RecommendedProfiles = () => {
  const [profiles, setProfiles] = useState([]);

  async function fetchRecommendedProfiles() {
    try {
      const response = await urqlClient.query(recommendProfiles, {
        request: {
          for: "0x040a",
        },
      });

      setProfiles(response.data.profileRecommendations.items);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchRecommendedProfiles();
  }, []);

  return (
    <div className="flex justify-center min-h-screen p-5">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {profiles.map((profile) => (
            <Link key={profile.id} href={`/profile/${profile.id}`}>
              <div className="block h-64">
                <div className="bg-white p-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 relative h-full flex flex-col justify-center items-center">
                  <div className="rounded-full overflow-hidden w-16 h-16 mx-auto mb-4">
                    <img
                      src={
                        profile.metadata?.coverPicture?.raw?.uri ||
                        "/default-profile-picture.jpg"
                      }
                      alt="Cover Picture"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-blue-500 hover:underline font-montserrat text-center">
                    <h2 className="text-xl font-semibold mb-2">
                      {profile.metadata?.displayName || "No Display Name"}
                    </h2>
                    <p className="text-gray-600">
                      {truncateBio(profile.metadata?.bio, 10)}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedProfiles;
