import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import { useAuth, useToast } from "../../contexts";

type userLevelDetailsType = {
  user_booster_level: number;
};

const Achievements = () => {
  const { currentUser } = useAuth();
  const { notifyError } = useToast();
  const [userLevelDetails, setUserLevelDetails] =
    useState<userLevelDetailsType>();

  const badges = [
    "https://res.cloudinary.com/dwhsfh3sc/image/upload/v1655721578/quiz-grad/assets/badges/medal_zx0ve2.png",
    "https://res.cloudinary.com/dwhsfh3sc/image/upload/v1655721581/quiz-grad/assets/badges/success_twqzkd.png",
    "https://res.cloudinary.com/dwhsfh3sc/image/upload/v1655721579/quiz-grad/assets/badges/star_vpaeam.png",
  ];

  const getUserAchievements = async () => {
    try {
      const { data, error } = await supabase
        .from("achievements")
        .select("user_booster_level")
        .eq("id", currentUser?.user.id)
        .single();
      if (error) throw error;
      setUserLevelDetails(data);
    } catch (error) {
      notifyError("Error occured while fetching achievements..");
    }
  };

  useEffect(() => {
    getUserAchievements();
  }, []);

  return (
    <div className="flex flex-column qg-flex-1 gap-1 mt-2 ">
      <div>
        <span className="label-text label-text-primary">Achievements</span>
      </div>
      <div className="ui-card-default py-1 shadow-md">
        <div className="flex flex-between">
          {userLevelDetails &&
            (userLevelDetails.user_booster_level >= 3 ? (
              <div className="">
                <img src={badges[0]} alt="badge-medal" title="Super badge" />
              </div>
            ) : (
              <div className="filter">
                <img
                  src={badges[0]}
                  alt="badge-medal"
                  title="Super badge will unlocked at level 3"
                />
              </div>
            ))}

          {userLevelDetails &&
            (userLevelDetails.user_booster_level >= 50 ? (
              <div className="">
                <img
                  src={badges[2]}
                  alt="Master-badge"
                  title="Master In Knowledge badge"
                />
              </div>
            ) : (
              <div className="filter">
                <img
                  src={badges[2]}
                  alt="Master-badge"
                  title="Master In Knowledge badge will unlocked at level 50"
                />
              </div>
            ))}
        </div>
        <div className="flex flex-align-item-center flex-justify-center">
          {userLevelDetails &&
            (userLevelDetails.user_booster_level >= 100 ? (
              <div className="">
                <img src={badges[1]} alt="Nerdy-badge" title="Nerdy badge" />
              </div>
            ) : (
              <div className="filter">
                <img
                  src={badges[1]}
                  alt="Nerdy-badge"
                  title="Nerdy badge will unlocked at level 100"
                />
              </div>
            ))}
        </div>
        <a className="btn-primary btn btn-py-1 mt-3 flex flex-justify-center ">
          <span className="icon-default-pl">More Badges Are Coming</span>
        </a>
      </div>
    </div>
  );
};

export { Achievements };
