import Link from "next/link"
import { cn } from "@/lib/utils";
import NumberTicker from "@/registry/default/magicui/number-ticker";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { StarIcon } from "@heroicons/react/24/solid";

/**
 * @see https://github.com/magicuidesign/magicui/blob/74a6255a7c7a5482702c704cb4edf219b12b51e5/components/site-header.tsx#L64
 */
async function StarOnGitHub() {
  let stars = 0; // Default value

  try {
    const response = await fetch(
      "https://api.github.com/repos/1chooo/tools",
      {
        headers: process.env.GITHUB_OAUTH_TOKEN
          ? {
            Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
            "Content-Type": "application/json",
          }
          : {},
        next: {
          revalidate: 3600,
        },
      },
    );

    if (response.ok) {
      const data = await response.json();
      stars = data.stargazers_count || stars; // Update stars if API response is valid
    }
  } catch (error) {
    console.error("Error fetching GitHub stars:", error);
  }

  return (
    <Link
      className={cn(
        buttonVariants({
          variant: "rainbow",
        }),
        "hidden md:inline-flex",
      )}
      target="_blank"
      href={"https://github.com/1chooo/1chooo.com"}
    >
      <div className="flex items-center">
        <Icons.gitHub className="size-4" />
        <span className="ml-1 lg:hidden">Star</span>
        <span className="ml-1 hidden lg:inline">Star on GitHub</span>{" "}
      </div>
      <div className="ml-2 flex items-center gap-1 text-sm md:flex">
        <StarIcon className="size-4 text-gray-500 transition-all duration-300 group-hover:text-yellow-300" />
        <NumberTicker
          value={stars}
          className="font-display font-medium text-white dark:text-black"
        />
      </div>
    </Link>
  );
}

export default StarOnGitHub;
