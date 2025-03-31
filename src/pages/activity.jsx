import { useState, useEffect } from "react";
import { Trophy, CheckCircle, Trash2, Search, ArrowUpDown } from "lucide-react";
import { useSelector } from "react-redux";
import { deleteData, getData } from "../fetch";
import { Link, useNavigate } from "react-router-dom";
import AchievementModal from "../components/Fragment/ModalAchievment";
import Swal from "sweetalert2";
import PageLayout from "../components/Layout/PageLayout";
import ActivityInformation from "../components/Fragment/ActivityInformation";
import ActivityLog from "../components/Fragment/ActivityLog";

const ActivityPage = () => {
  const [activities, setActivities] = useState([]);
  const [quizCount, setQuizCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [userAchievements, setUserAchievements] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const token = useSelector((state) => state.users.token);
  const user = useSelector((state) => state.users.user);
  const role = user?.role;

  const fetchActivity = async () => {
    try {
      await getData("activity", token).then((data) => {
        setActivities(data.activities);
        setQuizCount(data.activities.length);
        console.log(data);
      });
    } catch (error) {
      console.error("Error fetching activity:", error.message);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, [navigate]);

  useEffect(() => {
    const getUserAchievement = async () => {
      try {
        await getData(`user-achievements`, token).then((res) => {
          setUserAchievements(res);
          console.log(res);
        });
      } catch (error) {
        console.error("Error fetching activity:", error.message);
      }
    };

    getUserAchievement();
  }, []);

  const handleDelete = async (activityId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      scrollbarPadding: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteData(`activity/${activityId}`, token).then(
            async (res) => {
              console.log(res);
              await fetchActivity();
              Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "Quiz has been deleted!",
                scrollbarPadding: false,
              });
            }
          );
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
            scrollbarPadding: false,
          });
        }
      }
    });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (key) => {
    setSortBy(key);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredActivities = activities
    .filter((activity) =>
      activity.idQuiz.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortBy) return 0;
      const valA = sortBy === "date" ? new Date(a.completedAt) : a[sortBy];
      const valB = sortBy === "date" ? new Date(b.completedAt) : b[sortBy];
      return sortOrder === "asc" ? valA - valB : valB - valA;
    });

  return (
    <PageLayout>
      <div className="font-poppins min-h-screen text-white px-6 py-24">
        <h1 className="text-3xl font-bold mb-6">Activity</h1>
        <ActivityInformation
          quizCount={quizCount}
          userAchievements={userAchievements}
          setShowModal={setShowModal}
          showModal={showModal}
        />

        <ActivityLog
          handleSort={handleSort}
          searchQuery={searchQuery}
          handleSearch={handleSearch}
          handleDelete={handleDelete}
          filteredActivities={filteredActivities}
        />
      </div>

      {showModal && (
        <AchievementModal isOpen={showModal} onClose={setShowModal} />
      )}
    </PageLayout>
  );
};
export default ActivityPage;
