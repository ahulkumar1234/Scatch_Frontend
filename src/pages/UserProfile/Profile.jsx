import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ScaleLoader from "react-spinners/ScaleLoader";
import { MdDelete } from "react-icons/md";

const Profile = () => {

    const [profile, setProfile] = useState(null);

    const [deleteLoading, setDeleteLoading] = useState(false);
    const navigate = useNavigate();

    const deleteUser = async () => {
        setDeleteLoading(true)
        try {
            const res = await axios.delete('https://scatch-backend-41mw.onrender.com/api/v1/users/remove', { withCredentials: true });
            toast.success(res.data.message);
            navigate("/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Delete failed");
        } finally {
            setDeleteLoading(false);
        }
    }

    const fetchProfile = async () => {
        try {
            const res = await axios.get(
                'https://scatch-backend-41mw.onrender.com/api/v1/users/profile',
                { withCredentials: true }
            );
            setProfile(res.data.user);
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    if (!profile) {
        return <div className="flex justify-center items-center h-screen w-full text-xl">
            <ScaleLoader color="blue" />
        </div>
    }

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white max-w-[350px] w-full rounded-lg shadow-lg overflow-hidden">

                {/* Profile Image */}
                <div className="h-[200px] bg-gradient-to-r from-blue-500 to-indigo-600 flex justify-center items-center">
                    <img
                        src={"https://i.pravatar.cc/150?img=3"}
                        alt="User"
                        className="w-28 h-28 rounded-full border-4 border-white object-cover"
                    />
                </div>

                {/* User Info */}
                <div className="p-5 text-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {profile.fullname}
                    </h2>

                    <p className="text-sm text-gray-500">
                        {profile.email}
                    </p>

                    <div className="flex gap-3 justify-center mt-5">
                        <button
                            onClick={deleteUser}
                            className={`${deleteLoading ? "cursor-not-allowed" : "cursor-pointer"} flex justify-center items-center gap-0.5 px-3 py-2 border border-red-600 text-red-600 text-sm rounded-lg hover:bg-red-50 transition`}>
                            <MdDelete className='text-lg' />
                            {deleteLoading ? "Removing..." : "Remove account"}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profile;
