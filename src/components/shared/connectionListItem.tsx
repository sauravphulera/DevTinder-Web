import React from "react";
import { Connection } from "../../types/connection";

interface Props {
  user: Connection;
  showActions?: boolean;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
}

const ConnectionListItem: React.FC<Props> = ({
  user,
  showActions = false,
  onAccept,
  onReject,
}) => {
  return (
    <li className="flex items-center justify-between gap-4 p-4 bg-base-200 rounded-2xl border border-base-300 hover:bg-base-300 transition-all">
      {/* Left Section: Image + Details */}
      <div className="flex items-start gap-4 flex-1">
        {/* Photo */}
        <img
          src={user.photoUrl}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-16 h-16 rounded-full object-cover border-2 border-primary mt-1"
        />

        {/* Info */}
        <div className="flex-1">
          <div className="flex justify-between items-start flex-wrap">
            <div>
              <h3 className="text-lg font-semibold text-base-content">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-sm text-gray-500">Age {user.age}</p>
            </div>
          </div>

          {/* Skills */}
          {user.skills.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <span key={index} className="badge badge-outline badge-accent">
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm italic text-gray-400 mt-2">
              No skills listed
            </p>
          )}

          {/* Date */}
          <p className="text-xs text-gray-400 mt-3">
            Joined on{" "}
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Right Section: Badge on top right + Buttons below */}
      <div className="flex flex-col items-end self-start ml-4">
        <span
          className={`badge mb-4 ${
            user.gender.toLowerCase() === "female"
              ? "badge-secondary"
              : "badge-primary"
          }`}
        >
          {user.gender}
        </span>

        {showActions && (
          <div className="flex gap-2">
            <button
              className="btn btn-sm btn-success"
              onClick={() => onAccept?.(user.requestId)}
            >
              Accept
            </button>
            <button
              className="btn btn-sm btn-error"
              onClick={() => onReject?.(user.requestId)}
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </li>
  );
};

export default ConnectionListItem;
