import { createFileRoute, Link } from "@tanstack/react-router";
import type { FC } from "react";
import { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

// Types
interface HomeData {
  name: string;
  tagline: string;
  description: string;
  heroImageUrl: string;
  keyFeature: string;
}

// Mock API fetch function
const fetchHomeData = async (): Promise<HomeData> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    name: "Anscer Robotics",
    tagline: "Empowering Warehouses with Intelligent Automation",
    description:
      "Anscer Robotics delivers state-of-the-art warehouse automation solutions, including Pallet Lifter Robots (PLR), Articulated Robots (AR), and Automated Guided Vehicles (AGVs), designed to optimize logistics, boost efficiency, and enhance safety in modern warehouses.",
    heroImageUrl:
      "https://images.pexels.com/photos/9242858/pexels-photo-9242858.jpeg?auto=compress&cs=tinysrgb&w=600",
    keyFeature: "Seamless integration with 30% faster order fulfillment",
  };
};

// Animation Component
const HomeAnimatedElement: FC<{
  as: "h1" | "h2" | "h3" | "p" | "img";
  className?: string;
  children?: React.ReactNode;
  src?: string;
  alt?: string;
}> = ({ as, className = "", children, src, alt }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const baseStyles = "transition-all ease-out";
  const headingStyles = inView ? "opacity-100 scale-100" : "opacity-0 scale-90";
  const paragraphStyles = inView
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-8";
  const imageStyles = inView
    ? "opacity-100 scale-100 translate-y-0"
    : "opacity-0 scale-95 translate-y-4";

  const styles =
    as === "p"
      ? `${baseStyles} duration-800 ${paragraphStyles}`
      : as === "img"
        ? `${baseStyles} duration-800 ${imageStyles}`
        : `${baseStyles} duration-600 ${headingStyles}`;

  if (as === "img") {
    if (!src || !alt) return null;
    return (
      <img ref={ref} src={src} alt={alt} className={`${className} ${styles}`} />
    );
  }

  return (
    <as ref={ref} className={`${className} ${styles}`}>
      {children}
    </as>
  );
};

// Reusable Components
const Header = memo(({ name, tagline }: { name: string; tagline: string }) => (
  <header className="bg-blue-900 text-white py-6">
    <div className="container mx-auto px-2 sm:px-6 flex flex-col mt-2">
      <HomeAnimatedElement as="h1" className="text-3xl sm:text-4xl font-bold">
        {name}
      </HomeAnimatedElement>
      <HomeAnimatedElement as="p" className="mt-2 text-lg sm:text-xl">
        {tagline}
      </HomeAnimatedElement>
    </div>
  </header>
));

const HeroSection = memo(
  ({
    name,
    description,
    heroImageUrl,
  }: {
    name: string;
    description: string;
    heroImageUrl: string;
  }) => (
    <section className="bg-primary-foreground py-12 sm:py-16 sm:mb-12 min-h-fit">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <HomeAnimatedElement
            as="h2"
            className="text-3xl sm:text-4xl font-bold text-gray-800 flex"
          >
            Welcome to {name}
          </HomeAnimatedElement>
          <HomeAnimatedElement
            as="p"
            className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed flex"
          >
            {description}
          </HomeAnimatedElement>
          <Link
            to="/about"
            className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 hover:shadow-lg transition transform hover:-translate-y-1"
            aria-label="Learn More About Anscer Robotics"
          >
            Learn More
          </Link>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <div className="relative group overflow-hidden">
            <HomeAnimatedElement
              as="img"
              src={heroImageUrl}
              alt={name}
              className="rounded-lg shadow-md w-full max-h-96 object-cover group-hover:shadow-xl transition-shadow duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </div>
    </section>
  )
);

const FeatureTeaser = memo(({ keyFeature }: { keyFeature: string }) => (
  <section className="py-12 sm:py-16 bg-primary-foreground mb-4 sm:mb-12 min-h-fit">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <HomeAnimatedElement
        as="h3"
        className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center"
      >
        Why Choose Anscer Robotics?
      </HomeAnimatedElement>
      <HomeAnimatedElement
        as="p"
        className="text-base sm:text-lg text-gray-600 flex items-center justify-center"
      >
        {keyFeature}
      </HomeAnimatedElement>
      <Link
        to="/Dashboard"
        className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 hover:shadow-lg transition transform hover:-translate-y-1"
        aria-label="Explore All Features"
      >
        Explore All Features
      </Link>
    </div>
  </section>
));

const LoadingSpinner: FC = () => (
  <div className="flex justify-center items-center h-screen bg-primary-foreground">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600" />
  </div>
);

// Main Component
const HomePage: FC = () => {
  const { data, isLoading, error } = useQuery<HomeData, Error>({
    queryKey: ["homeData"],
    queryFn: fetchHomeData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl text-red-600">Error: {error.message}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl text-gray-600">No data available</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 font-sans min-h-screen">
      <style>
        {`
          @media (prefers-reduced-motion: reduce) {
            .transition-all {
              transition: none !important;
              transform: none !important;
              opacity: 1 !important;
            }
          }
        `}
      </style>
      <Header name={data.name} tagline={data.tagline} />
      <HeroSection
        name={data.name}
        description={data.description}
        heroImageUrl={data.heroImageUrl}
      />
      <FeatureTeaser keyFeature={data.keyFeature} />

      {/* About Robots */}
      <section className="py-12 sm:py-16 bg-white mb-4 sm:mb-12 min-h-fit">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <HomeAnimatedElement
              as="h2"
              className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4"
            >
              About Warehouse Robots
            </HomeAnimatedElement>
            <HomeAnimatedElement
              as="p"
              className="text-base sm:text-lg text-gray-600 leading-relaxed flex"
            >
              Anscer Robotics designs advanced warehouse robots, including Pallet Lifter Robots (PLR), Articulated Robots (AR), and Automated Guided Vehicles (AGVs). These robots streamline material handling, palletizing, and transportation tasks, reducing manual labor and boosting throughput. Equipped with AI-driven navigation and precision sensors, our robots ensure safe and efficient operations, transforming warehouses into smart, scalable logistics hubs.
            </HomeAnimatedElement>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="relative group overflow-hidden">
              <HomeAnimatedElement
                as="img"
                src="https://images.pexels.com/photos/1632790/pexels-photo-1632790.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Warehouse robot transporting goods"
                className="rounded-lg shadow-md w-full max-h-80 object-cover group-hover:shadow-xl transition-shadow duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* How Robotics Industry Works */}
      <section className="py-12 sm:py-16 bg-gray-50 mb-4 sm:mb-12 min-h-fit">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row-reverse items-center gap-8">
          <div className="md:w-1/2">
            <HomeAnimatedElement
              as="h2"
              className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4"
            >
              How Warehouse Automation Works
            </HomeAnimatedElement>
            <HomeAnimatedElement
              as="p"
              className="text-base sm:text-lg text-gray-600 leading-relaxed flex"
            >
              The warehouse automation industry, led by innovators like Anscer Robotics, combines robotics, AI, and IoT to optimize logistics. Our PLR, AR, and AGV robots are designed for tasks like palletizing, picking, and transporting goods. Integrated with warehouse management systems (WMS), they use real-time data and machine learning for precise navigation and task execution. This results in faster order processing, reduced errors, and scalable operations tailored to modern e-commerce and supply chain demands.
            </HomeAnimatedElement>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="relative group overflow-hidden">
              <HomeAnimatedElement
                as="img"
                src="https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Automated warehouse operations"
                className="rounded-lg shadow-md w-full max-h-80 object-cover group-hover:shadow-xl transition-shadow duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* How Robotics Security Works */}
      <section className="py-12 sm:py-16 bg-white sm:mb-12 min-h-fit">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <HomeAnimatedElement
              as="h2"
              className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4"
            >
              How Warehouse Robotics Enhances Safety
            </HomeAnimatedElement>
            <HomeAnimatedElement
              as="p"
              className="text-base sm:text-lg text-gray-600 leading-relaxed flex"
            >
              Anscer Robotics’ warehouse solutions prioritize safety through advanced sensors (e.g., LIDAR, cameras) and AI-driven obstacle detection. Our PLR, AR, and AGV robots navigate complex warehouse environments, avoiding collisions and ensuring smooth operations. Robust safety protocols and real-time monitoring reduce workplace injuries by automating heavy lifting and repetitive tasks, creating a safer environment for workers and enabling compliance with stringent safety standards.
            </HomeAnimatedElement>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="relative group overflow-hidden">
              <HomeAnimatedElement
                as="img"
                src="https://robotnik.eu/wp-content/uploads/2023/06/RB-WATCHER_ROBOTNIK_2-scaled.jpg"
                alt="AGV robot in warehouse"
                className="rounded-lg shadow-md w-full max-h-80 object-cover group-hover:shadow-xl transition-shadow duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* How Robots Can Help Us */}
      <section className="py-10 sm:py-16 bg-gray-50  sm:mb-12 min-h-fit">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row-reverse items-center gap-8">
          <div className="md:w-1/2">
            <HomeAnimatedElement
              as="h2"
              className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4"
            >
              How Warehouse Robots Transform Logistics
            </HomeAnimatedElement>
            <HomeAnimatedElement
              as="p"
              className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6 flex"
            >
              Anscer Robotics’ PLR, AR, and AGV robots revolutionize warehouse logistics by automating material handling, reducing operational costs, and accelerating order fulfillment. These robots enhance scalability, allowing warehouses to handle peak demands efficiently. By integrating with IoT and data analytics, our solutions minimize errors, optimize inventory management, and promote sustainability, driving the future of smart, cost-effective, and agile supply chains.
            </HomeAnimatedElement>
            <Link
              to="/Dashboard"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 hover:shadow-lg transition transform hover:-translate-y-1"
              aria-label="Learn More About Robotics"
            >
              Learn More
            </Link>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="relative group overflow-hidden">
              <HomeAnimatedElement
                as="img"
                src="https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Warehouse automation system"
                className="rounded-lg shadow-md w-full max-h-80 object-cover group-hover:shadow-xl transition-shadow duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Route Definition
export const Route = createFileRoute("/")({
  component: HomePage,
});

export default HomePage;