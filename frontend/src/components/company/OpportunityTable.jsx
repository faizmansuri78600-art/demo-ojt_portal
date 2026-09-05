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

          <thead>

            <tr className="border-b border-[#E5E7EB]">

              <th className="w-[35px] px-2 py-3 text-left text-[10px] font-semibold text-[#475569]">
                #
              </th>

              <th className="w-[24%] px-2 py-3 text-left text-[10px] font-semibold text-[#475569]">
                Opportunity Title
              </th>

              <th className="w-[15%] px-2 py-3 text-left text-[10px] font-semibold text-[#475569]">
                Department
              </th>

              <th className="w-[10%] px-2 py-3 text-left text-[10px] font-semibold text-[#475569]">
                Duration
              </th>

              <th className="w-[13%] px-2 py-3 text-left text-[10px] font-semibold text-[#475569]">
                Location
              </th>

              <th className="w-[12%] px-2 py-3 text-left text-[10px] font-semibold text-[#475569]">
                Stipend
              </th>

              <th className="w-[9%] px-2 py-3 text-left text-[10px] font-semibold text-[#475569]">
                Status
              </th>

              <th className="w-[10%] px-2 py-3 text-left text-[10px] font-semibold text-[#475569]">
                Posted On
              </th>

              <th className="w-[8%] px-2 py-3 text-left text-[10px] font-semibold text-[#475569]">
                Actions
              </th>

            </tr>

          </thead>


          <tbody>

            {opportunities.length === 0 ? (

              <tr>

                <td
                  colSpan="9"
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
                  "
                >

                  {/* NUMBER */}

                  <td className="px-2 py-3 text-[10px] text-[#64748B] align-middle">
                    {index + 1}
                  </td>


                  {/* TITLE */}

                  <td className="px-2 py-3 align-middle">

                    <p className="text-[10px] font-semibold text-[#111827] truncate">
                      {item.title}
                    </p>

                    <p className="text-[8px] text-[#94A3B8] mt-0.5 truncate">
                      {item.description}
                    </p>

                  </td>


                  {/* DEPARTMENT */}

                  <td className="px-2 py-3 text-[9px] text-[#475569] align-middle truncate">
                    {item.department}
                  </td>


                  {/* DURATION */}

                  <td className="px-2 py-3 text-[9px] text-[#475569] align-middle whitespace-nowrap">
                    {item.duration}
                  </td>


                  {/* LOCATION */}

                  <td className="px-2 py-3 text-[9px] text-[#475569] align-middle truncate">
                    {item.location}
                  </td>


                  {/* STIPEND */}

                  <td className="px-2 py-3 text-[9px] text-[#475569] align-middle whitespace-nowrap">
                    {item.stipend}
                  </td>


                  {/* STATUS */}

                  <td className="px-2 py-3 align-middle">

                    <StatusBadge
                      status={item.status}
                    />

                  </td>


                  {/* POSTED */}

                  <td className="px-2 py-3 text-[9px] text-[#475569] align-middle whitespace-nowrap">
                    {item.posted}
                  </td>


                  {/* ACTIONS */}

                  <td className="px-2 py-3 align-middle">

                    <div className="flex items-center gap-2">


                      {/* EDIT */}

                      <button
                        type="button"
                        onClick={() =>
                          onEdit(item)
                        }
                        title="Edit"
                        className="
                          text-[#1E5EFF]
                          hover:text-[#174dcc]
                        "
                      >

                        <Pencil
                          size={12}
                          strokeWidth={1.8}
                        />

                      </button>


                      {/* VIEW */}

                      <button
                        type="button"
                        onClick={() =>
                          onView(item)
                        }
                        title="View"
                        className="
                          text-[#64748B]
                          hover:text-[#1E5EFF]
                        "
                      >

                        <Eye
                          size={12}
                          strokeWidth={1.8}
                        />

                      </button>


                      {/* DELETE */}

                      <button
                        type="button"
                        onClick={() =>
                          onDelete(item)
                        }
                        title="Delete"
                        className="
                          text-[#EF4444]
                          hover:text-[#DC2626]
                        "
                      >

                        <Trash2
                          size={12}
                          strokeWidth={1.8}
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

      <div className="px-3 py-3 flex items-center justify-between">

        <p className="text-[9px] text-[#64748B]">

          Showing 1 to {opportunities.length} of{" "}
          {opportunities.length} entries

        </p>


        <div className="flex items-center gap-1.5">

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
            "
          >

            <ChevronLeft size={12} />

          </button>


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
            "
          >
            1
          </button>


          <button
            type="button"
            className="w-6 h-6 text-[9px] text-[#475569]"
          >
            2
          </button>


          <button
            type="button"
            className="w-6 h-6 text-[9px] text-[#475569]"
          >
            3
          </button>


          <span className="text-[9px] text-[#64748B] px-1">
            ...
          </span>


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
            "
          >

            <ChevronRight size={12} />

          </button>

        </div>

      </div>

    </div>
  );
}


/* ================= STATUS BADGE ================= */

function StatusBadge({ status }) {

  const styles = {

    Active:
      "bg-[#DCFCE7] text-[#16A34A]",

    Draft:
      "bg-[#F1F5F9] text-[#64748B]",

    Closed:
      "bg-[#FEE2E2] text-[#DC2626]",

  };


  return (

    <span
      className={`
        inline-flex
        items-center
        px-2
        py-1
        rounded-full
        text-[8px]
        font-medium
        whitespace-nowrap
        ${styles[status]}
      `}
    >
      {status}
    </span>

  );
}