import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Linkedin,
  Instagram,
  Facebook,
} from "lucide-react";
import logo from "../../assets/aisc-logo.png";
import { useCoordinatorTheme } from "../../context/CoordinatorThemeContext";

function FooterThemeWrapper() {
  const { colors } = useCoordinatorTheme();

  return <FooterContent colors={colors} />;
}

function FooterContent({ colors }) {
  return (
    <footer
      style={{
        width: "100%",
        backgroundColor: colors.sidebar,
        color: "#FFFFFF",
        borderTop: "1px solid rgba(255,255,255,0.12)",
        fontFamily:
          '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1600px",
          margin: "0 auto",
          padding: "38px 32px 28px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(260px, 1.5fr) minmax(180px, 1fr) minmax(220px, 1.2fr)",
            gap: "36px",
            alignItems: "start",
          }}
        >
          {/* BRAND / COLLEGE INFORMATION */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "10px",
                  backgroundColor: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  overflow: "hidden",
                }}
              >
                <img
                  src={logo}
                  alt="AISC Logo"
                  style={{
                    width: "42px",
                    height: "42px",
                    objectFit: "contain",
                  }}
                />
              </div>

              <div>
                <div
                  style={{
                    fontSize: "17px",
                    fontWeight: 700,
                    lineHeight: 1.25,
                    letterSpacing: "-0.01em",
                  }}
                >
                  AISC OJT
                </div>

                <div
                  style={{
                    marginTop: "3px",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    opacity: 0.78,
                  }}
                >
                  MANAGEMENT PORTAL
                </div>
              </div>
            </div>

            <p
              style={{
                margin: "0 0 18px",
                maxWidth: "520px",
                fontSize: "13px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.76)",
              }}
            >
              A centralized platform for managing student internships,
              company coordination, faculty mentorship, OJT tracking,
              announcements and academic reporting.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "9px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.78)",
                }}
              >
                <MapPin size={15} strokeWidth={1.8} />
                <span>Pune, Maharashtra</span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.78)",
                }}
              >
                <Mail size={15} strokeWidth={1.8} />
                <span>OJT Coordination Office</span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.78)",
                }}
              >
                <Phone size={15} strokeWidth={1.8} />
                <span>College Administration</span>
              </div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3
              style={{
                margin: "0 0 16px",
                fontSize: "14px",
                fontWeight: 700,
                color: "#FFFFFF",
              }}
            >
              Quick Links
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "11px",
              }}
            >
              {[
                "Dashboard",
                "Student Management",
                "Company Management",
                "Mentor Assignment",
                "OJT Tracking",
                "Announcements",
                "Generate Reports",
              ].map((item) => (
                <a
                  key={item}
                  href="#"
                  onClick={(event) => event.preventDefault()}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "rgba(255,255,255,0.74)",
                    textDecoration: "none",
                    fontSize: "12px",
                    lineHeight: 1.4,
                    transition: "color 150ms ease",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.color = "#FFFFFF";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.color =
                      "rgba(255,255,255,0.74)";
                  }}
                >
                  <ExternalLink size={12} strokeWidth={1.8} />
                  <span>{item}</span>
                </a>
              ))}
            </div>
          </div>

          {/* CONTACT / SOCIAL */}
          <div>
            <h3
              style={{
                margin: "0 0 16px",
                fontSize: "14px",
                fontWeight: 700,
                color: "#FFFFFF",
              }}
            >
              OJT Coordination Office
            </h3>

            <p
              style={{
                margin: "0 0 18px",
                fontSize: "12px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.72)",
              }}
            >
              Supporting students, faculty and partner organizations
              throughout the entire On-the-Job Training lifecycle.
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "9px",
              }}
            >
              {[
                {
                  label: "LinkedIn",
                  icon: <Linkedin size={16} />,
                },
                {
                  label: "Instagram",
                  icon: <Instagram size={16} />,
                },
                {
                  label: "Facebook",
                  icon: <Facebook size={16} />,
                },
              ].map((social) => (
                <button
                  key={social.label}
                  type="button"
                  aria-label={social.label}
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.16)",
                    backgroundColor: "rgba(255,255,255,0.08)",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition:
                      "background-color 150ms ease, border-color 150ms ease",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.backgroundColor =
                      "rgba(255,255,255,0.16)";
                    event.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.28)";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.backgroundColor =
                      "rgba(255,255,255,0.08)";
                    event.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.16)";
                  }}
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "rgba(255,255,255,0.12)",
            margin: "30px 0 18px",
          }}
        />

        {/* BOTTOM BAR */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.62)",
            }}
          >
            © {new Date().getFullYear()} AISC OJT Management Portal. All
            rights reserved.
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              fontSize: "11px",
              color: "rgba(255,255,255,0.62)",
            }}
          >
            <span>College Administration</span>
            <span>•</span>
            <span>OJT Coordination Office</span>
          </div>
        </div>
      </div>

      <style>
        {`
          @media (max-width: 900px) {
            footer > div > div:first-child {
              grid-template-columns: 1fr 1fr !important;
            }
          }

          @media (max-width: 620px) {
            footer > div {
              padding: 30px 18px 22px !important;
            }

            footer > div > div:first-child {
              grid-template-columns: 1fr !important;
              gap: 28px !important;
            }

            footer > div > div:last-child {
              flex-direction: column !important;
              align-items: flex-start !important;
            }
          }
        `}
      </style>
    </footer>
  );
}

export default function Footer() {
  /*
   * Footer is shared by PublicLayout and CoordinatorLayout.
   *
   * CoordinatorLayout provides CoordinatorThemeProvider.
   * PublicLayout does not.
   *
   * We therefore check whether the coordinator theme is available
   * instead of directly calling the hook here.
   */
  let colors;

  try {
    const context = useCoordinatorTheme();
    colors = context.colors;
  } catch (error) {
    colors = {
      sidebar: "#1E4D7B",
    };
  }

  return <FooterContent colors={colors} />;
}