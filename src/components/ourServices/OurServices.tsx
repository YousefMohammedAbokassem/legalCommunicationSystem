import React from "react";
import { HeaderSection } from "../headerSection/HeaderSection";
import { useTranslation } from "react-i18next";
import ChatIcon from "@mui/icons-material/Chat";

export default function OurServices() {
  const [t] = useTranslation();
  return (
    <div className="py-8 container mx-auto">
      <HeaderSection text={t("ourServices")} />
      <div className="services mx-6">
      <div className="service">
        
          <span>
            <ChatIcon sx={{ fontSize: 60, color: 'var(--clr-product)' ,mb:"20px"}} />
          </span>
          <h3>contact directly with lawyers</h3>
          <p>
          Elevate performance through expert landing page design services and
          conversion rate optimization strategies Elevate performance through expert landing page design services and
          conversion rate optimization strategies Elevate performance through expert landing page design services and
          conversion rate optimization strategies
          </p>
        </div><div className="service">
          <span>
            <ChatIcon sx={{ fontSize: 60, color: 'var(--clr-product)' ,mb:"20px"}} />
          </span>
          <h3>contact directly with lawyers</h3>
          <p>
          Elevate performance through expert landing page design services and
          conversion rate optimization strategies Elevate performance through expert landing page design services and
          conversion rate optimization strategies Elevate performance through expert landing page design services and
          conversion rate optimization strategies
          </p>
        </div><div className="service">
          <span>
            <ChatIcon sx={{ fontSize: 60, color: 'var(--clr-product)' ,mb:"20px"}} />
          </span>
          <h3>contact directly with lawyers</h3>
          <p>
          Elevate performance through expert landing page design services and
          conversion rate optimization strategies Elevate performance through expert landing page design services and
          conversion rate optimization strategies Elevate performance through expert landing page design services and
          conversion rate optimization strategies
          </p>
        </div>
        
      </div>
    </div>
  );
}