import {
  Pencil,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function OpportunityTable({
  opportunities,
  onEdit,
  onView,
  onDelete,
}) {
  return (
    <div
      className="
        w-full
        bg-white
        border
        border-[#E5E7EB]
        rounded-[10px]
        overflow-hidden
      "
    >
      {/* ================= TABLE ================= */}

      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse table-fixed">

          {/* ================= TABLE HEADER ================= */}

          <thead>
            <tr className="border-b border-[#E5E7EB] bg-white">

              <th
                className="
                  w-[35px]
                  px-2
                  py-3
                  text-left
                  text-[10px]
                  font-semibold
                  text-[#475569]
                "
              >
                #
              </th>

              <th
                className="
                  w-[21%]
                  px-2
                  py-3
                  text-left
                  text-[10px]
                  font-semibold
                  text-[#475569]
                "
              >
                Opportunity Title
              </th>

              <th
                className="
                  w-[15%]
                  px-2
                  py-3
                  text-left
                  text-[10px]
                  font-semibold
                  text-[#475569]
                "
              >
                Department
              </th>

              <th
                className="
                  w-[10%]
                  px-2
                  py-3
                  text-left
                  text-[10px]
                  font-semibold
                  text-[#475569]
                "
              >
                Duration
              </th>

              <th
                className="
                  w-[11%]
                  px-2
                  py-3
                  text-left
                  text-[10px]
                  font-semibold
                  text-[#475569]
                "
              >
                Location
              </th>

              <th
                className="
                  w-[10%]
                  px-2
                  py-3
                  text-left
                  text-[10px]
                  font-semibold
                  text-[#475569]
                "
              >
                Stipend
              </th>

              <th
                className="
                  w-[8%]
                  px-2
                  py-3
                  text-left
                  text-[10px]
                  font-semibold
                  text-[#475569]
                "
              >
                Status
              </th>

              <th
                className="
                  w-[8%]
                  px-2
                  py-3
                  text-left
                  text-[10px]
                  font-semibold
                  text-[#475569]
                "
              >
                Last Date
              </th>

              <th
                className="
                  w-[8%]
                  px-2
                  py-3
                  text-left
                  text-[10px]
                  font-semibold
                  text-[#475569]
                "
              >
                Posted On
              </th>

              <th
                className="
                  w-[8%]
                  px-2
                  py-3
                  text-left
                  text-[10px]
                  font-semibold
                  text-[#475569]
                "
              >
                Actions
              </th>

            </tr>
          </thead>

          {/* ================= TABLE BODY ================= */}

          <tbody>

            {opportunities.length === 0 ? (

              <tr>
                <td
                  colSpan="10"
                  className="
                    text-center
                    py-10
                    text-[11px]
                    text-[#64748B]
                  "
                >
                  No opportunities found.
                </td>
              </tr>

            ) : (

              opportunities.map((item, index) => (

                <tr
                  key={item.id}
                  className="
                    border-b
                    border-[#E5E7EB]
                    last:border-b-0
                    hover:bg-[#F8FAFC]
                    transition-colors
                  "
                >

                  {/* ================= NUMBER ================= */}

                  <td
                    className="
                      px-2
                      py-3
                      text-[10px]
                      text-[#64748B]
                      align-middle
                    "
                  >
                    {index + 1}
                  </td>

                  {/* ================= TITLE ================= */}

                  <td className="px-2 py-3 align-middle">

                    <p
                      className="
                        text-[10px]
                        font-semibold
                        text-[#111827]
                        truncate
                      "
                      title={item.title}
                    >
                      {item.title}
                    </p>

                    <p
                      className="
                        text-[8px]
                        text-[#94A3B8]
                        mt-0.5
                        truncate
                      "
                      title={item.description}
                    >
                      {item.description}
                    </p>

                  </td>

                  {/* ================= DEPARTMENT ================= */}

                  <td
                    className="
                      px-2
                      py-3
                      text-[9px]
                      text-[#475569]
                      align-middle
                      truncate
                    "
                    title={item.department}
                  >
                    {item.department}
                  </td>

                  {/* ================= DURATION ================= */}

                  <td
                    className="
                      px-2
                      py-3
                      text-[9px]
                      text-[#475569]
                      align-middle
                      whitespace-nowrap
                    "
                  >
                    {item.duration}
                  </td>

                  {/* ================= LOCATION ================= */}

                  <td
                    className="
                      px-2
                      py-3
                      text-[9px]
                      text-[#475569]
                      align-middle
                      truncate
                    "
                    title={item.location}
                  >
                    {item.location}
                  </td>

                  {/* ================= STIPEND ================= */}

                  <td
                    className="
                      px-2
                      py-3
                      text-[9px]
                      text-[#475569]
                      align-middle
                      whitespace-nowrap
                    "
                  >
                    {item.stipend}
                  </td>

                  {/* ================= STATUS ================= */}

                  <td className="px-2 py-3 align-middle">
                    <StatusBadge status={item.status} />
                  </td>

                  {/* ================= LAST DATE ================= */}

                  <td
                    className="
                      px-2
                      py-3
                      text-[9px]
                      text-[#475569]
                      align-middle
                      whitespace-nowrap
                    "
                  >
                    {item.lastDate || "-"}
                  </td>

                  {/* ================= POSTED DATE ================= */}

                  <td
                    className="
                      px-2
                      py-3
                      text-[9px]
                      text-[#475569]
                      align-middle
                      whitespace-nowrap
                    "
                  >
                    {item.posted}
                  </td>

                  {/* ================= ACTIONS ================= */}

                  <td className="px-2 py-3 align-middle">

                    <div className="flex items-center gap-1.5">

                      {/* EDIT */}

                      <button
                        type="button"
                        onClick={() => onEdit(item)}
                        title="Edit"
                        className="
                          w-6
                          h-6
                          rounded-[5px]
                          bg-[#EFF6FF]
                          text-[#2563EB]
                          flex
                          items-center
                          justify-center
                          transition
                          hover:bg-[#DBEAFE]
                        "
                      >
                        <Pencil
                          size={11}
                          strokeWidth={2}
                        />
                      </button>

                      {/* VIEW */}

                      <button
                        type="button"
                        onClick={() => onView(item)}
                        title="View"
                        className="
                          w-6
                          h-6
                          rounded-[5px]
                          bg-[#F1F5F9]
                          text-[#64748B]
                          flex
                          items-center
                          justify-center
                          transition
                          hover:bg-[#E2E8F0]
                        "
                      >
                        <Eye
                          size={11}
                          strokeWidth={2}
                        />
                      </button>

                      {/* DELETE */}

                      <button
                        type="button"
                        onClick={() => onDelete(item)}
                        title="Delete"
                        className="
                          w-6
                          h-6
                          rounded-[5px]
                          bg-[#FEF2F2]
                          text-[#EF4444]
                          flex
                          items-center
                          justify-center
                          transition
                          hover:bg-[#FEE2E2]
                        "
                      >
                        <Trash2
                          size={11}
                          strokeWidth={2}
                        />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>
        </table>
      </div>

      {/* ================= TABLE FOOTER ================= */}

      <div
        className="
          px-3
          py-3
          flex
          items-center
          justify-between
          bg-white
        "
      >

        {/* ENTRY COUNT */}

        <p className="text-[9px] text-[#64748B]">

          Showing 1 to {opportunities.length} of{" "}
          {opportunities.length} entries

        </p>

        {/* PAGINATION */}

        <div className="flex items-center gap-1.5">

          {/* PREVIOUS */}

          <button
            type="button"
            className="
              w-6
              h-6
              border
              border-[#E5E7EB]
              rounded-[6px]
              flex
              items-center
              justify-center
              text-[#64748B]
              bg-white
              hover:bg-[#F8FAFC]
            "
          >
            <ChevronLeft size={12} />
          </button>

          {/* PAGE 1 */}

          <button
            type="button"
            className="
              w-6
              h-6
              rounded-[6px]
              bg-[#1E5EFF]
              text-white
              text-[9px]
              font-medium
              flex
              items-center
              justify-center
            "
          >
            1
          </button>

          {/* PAGE 2 */}

          <button
            type="button"
            className="
              w-6
              h-6
              rounded-[6px]
              text-[9px]
              text-[#475569]
              hover:bg-[#F1F5F9]
            "
          >
            2
          </button>

          {/* PAGE 3 */}

          <button
            type="button"
            className="
              w-6
              h-6
              rounded-[6px]
              text-[9px]
              text-[#475569]
              hover:bg-[#F1F5F9]
            "
          >
            3
          </button>

          {/* DOTS */}

          <span className="text-[9px] text-[#64748B] px-1">
            ...
          </span>

          {/* NEXT */}

          <button
            type="button"
            className="
              w-6
              h-6
              border
              border-[#E5E7EB]
              rounded-[6px]
              flex
              items-center
              justify-center
              text-[#64748B]
              bg-white
              hover:bg-[#F8FAFC]
            "
          >
            <ChevronRight size={12} />
          </button>

        </div>

      </div>
    </div>
  );
}


/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status }) {

  const normalizedStatus = String(status || "").toLowerCase();

  let badgeStyle =
    "bg-[#F1F5F9] text-[#64748B]";

  let displayStatus = status || "Unknown";

  /* GREEN — ACTIVE / OPEN */

  if (
    normalizedStatus === "active" ||
    normalizedStatus === "open"
  ) {
    badgeStyle = "bg-[#DCFCE7] text-[#16A34A]";
  }

  /* GRAY — DRAFT */

  else if (normalizedStatus === "draft") {
    badgeStyle = "bg-[#F1F5F9] text-[#64748B]";
  }

  /* RED — CLOSED */

  else if (normalizedStatus === "closed") {
    badgeStyle = "bg-[#FEE2E2] text-[#DC2626]";
  }

  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        px-2
        py-[4px]
        rounded-full
        text-[8px]
        font-medium
        whitespace-nowrap
        leading-none
        ${badgeStyle}
      `}
    >
      {displayStatus}
    </span>
  );
}