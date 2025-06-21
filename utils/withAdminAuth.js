import { useEffect } from "react";
import { useRouter } from "next/router";

export default function withAdminAuth(Component) {
  return function Wrapper(props) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/admin/login");
      } else {
        try {
          const [, payload] = token.split(".");
          const user = JSON.parse(atob(payload));
          if (!user.isAdmin) router.replace("/");
        } catch {
          router.replace("/admin/login");
        }
      }
    }, []);

    return <Component {...props} />;
  };
}
