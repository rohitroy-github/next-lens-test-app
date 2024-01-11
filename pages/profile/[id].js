import {useRouter} from "next/router";
import {useState, useEffect} from "react";
import {getProfileByID, urqlClient} from "../../api";

export default function Profile() {
  const router = useRouter();
  const {id} = router.query;

  const [profile, setProfile] = useState(null);

  async function fetchProfileInformation() {
    try {
      const response = await urqlClient.query(getProfileByID, {
        request: {
          forProfileId: `${id}`,
        },
      });

      setProfile(response.data.profile);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (id) {
      fetchProfileInformation();
    }
  }, [id]);

  if (!profile) {
    // If the profile is not yet loaded, you can render a loading state or redirect to an error page
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-5">
      <div className="container mx-auto text-center">
        <div className="flex flex-col items-center">
          {/* Display profile image if available */}
          {profile.metadata.picture && (
            <img
              src={
                profile.metadata.picture?.raw.uri ||
                "/default-profile-picture.jpg"
              }
              alt="Profile Picture"
              className="rounded-full h-32 w-32 object-cover mb-4"
            />
          )}

          {/* Display displayName, id, and bio */}
          <h1 className="text-3xl font-montserrat mb-2">
            {profile.metadata.displayName}
          </h1>
          <p className="text-gray-600 mb-4 font-montserrat">{profile.id}</p>
          <p className="text-gray-800 font-montserrat">
            {profile.metadata.bio}
          </p>

          {/* Display followers, following, and number of posts */}
          <div className="mt-4">
            <p className="text-gray-600 font-montserrat">
              Followers: {profile.stats.followers}
            </p>
            <p className="text-gray-600 font-montserrat">
              Following: {profile.stats.following}
            </p>
            <p className="text-gray-600 font-montserrat">
              Posts: {profile.stats.posts}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
