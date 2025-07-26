import { useEffect, useState } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import NetworkSvg from "@/components/custom-ui/image/NetworkSvg";
import type { UserPermission, SubPermission } from "@/database/models";
import AnimatedItem from "@/hook/animated-item";
import { useLocation } from "react-router";

export interface SidebarItemProps {
  path: string;
  permission: string;
  isActive: boolean;
  t: any;
  user_permission: UserPermission;
  navigateTo: (path: string) => void;
}

export function SidebarItem({
  isActive,
  navigateTo,
  user_permission,
  t,
  path,
  permission,
}: SidebarItemProps) {
  const location = useLocation();
  const urlParts = location.pathname.split("/");
  const selectedSubId = Number(urlParts[urlParts.length - 1]); // Convert to number
  const [categories, setCategories] = useState<SubPermission[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const subs = Array.from(user_permission.sub.values()).filter(
      (sub) => sub.is_category
    );
    setCategories(subs);

    const currentPath = window.location.pathname;
    const matched = subs.find((sub) =>
      currentPath.includes(`${path}/${sub.id}`)
    );

    if (matched) {
      setShowDropdown(true);
    }
  }, [user_permission.sub, path, location.pathname]);

  const handleClick = () => {
    if (categories.length === 0) {
      navigateTo(path);
    } else {
      setShowDropdown((prev) => !prev);
    }
  };

  const handleCategoryClick = (cat: SubPermission) => {
    navigateTo(`${path}/${cat.id}`);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`flex justify-between items-center cursor-pointer py-[8px] mx-2 rounded-[8px] ${
          isActive
            ? "bg-blue-500/30 text-tertiary font-semibold ltr:text-lg-ltr rtl:text-3xl-rtl"
            : "hover:opacity-75 rtl:text-xl-rtl ltr:text-md-ltr"
        }`}
        key={permission}
      >
        <div className="flex gap-x-3 items-center w-full">
          <NetworkSvg src={user_permission.icon} routeIdentifier={"public"} />
          <h1 className="truncate">{t(permission)}</h1>
        </div>

        {categories.length > 0 && (
          <div className="ml-auto">
            {showDropdown ? (
              <ChevronUp className="size-4 text-white/70 ltr:mr-2 rtl:ml-2" />
            ) : (
              <ChevronDown className="size-4 text-white/70 ltr:mr-2 rtl:ml-2" />
            )}
          </div>
        )}
      </div>

      {showDropdown && categories.length > 0 && (
        <ul className="mt-1 space-y-1">
          {categories.map((cat, index: number) => {
            const selected = selectedSubId === cat.id;
            return (
              <AnimatedItem
                key={cat.name}
                springProps={{
                  from: {
                    opacity: 0,
                    transform: "translateY(-8px)",
                  },
                  config: {
                    mass: 1,
                    tension: 210,
                    friction: 20,
                  },
                  to: {
                    opacity: 1,
                    transform: "translateY(0px)",

                    delay: index * 100,
                  },
                  delay: index * 100,
                }}
                intersectionArgs={{
                  rootMargin: "-10% 0%",
                  once: true,
                }}
              >
                <li
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat)}
                  className={`cursor-pointer mx-auto text-primary-foreground/85 rtl:text-lg-rtl rtl:font-bold ltr:text-md-ltr flex items-center gap-x-2 py-1 px-2 w-[85%] rounded-sm transition-colors ${
                    selected
                      ? "font-semibold bg-blue-500/10"
                      : " hover:opacity-75"
                  }`}
                >
                  <Check
                    className={`size-4 ${
                      selected ? "text-tertiary stroke-3" : " invisible"
                    }`}
                  />
                  {t(cat.name)}
                </li>
              </AnimatedItem>
            );
          })}
        </ul>
      )}
    </>
  );
}
