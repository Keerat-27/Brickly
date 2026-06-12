import { useCallback, useEffect, useState } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../components/ui/carousel";
import { cn } from "../components/ui/utils";

const slides = [
  { title: "Mountain Vista", color: "from-slate-600 to-slate-800" },
  { title: "Ocean Sunset", color: "from-orange-400 to-rose-600" },
  { title: "Forest Trail", color: "from-emerald-600 to-teal-800" },
  { title: "Desert Dunes", color: "from-amber-400 to-orange-700" },
];

const cardSlides = [
  { title: "Starter", price: "$9", desc: "For side projects" },
  { title: "Pro", price: "$29", desc: "For growing teams" },
  { title: "Enterprise", price: "$99", desc: "For large orgs" },
];

const CarouselDots = ({ api }: { api: CarouselApi | undefined }) => {
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (count <= 1) return null;

  return (
    <div className="flex justify-center gap-1.5 pt-4">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to slide ${i + 1}`}
          onClick={() => api?.scrollTo(i)}
          className={cn(
            "h-2 w-2 rounded-full transition-colors",
            i === current ? "bg-primary" : "bg-muted-foreground/30",
          )}
        />
      ))}
    </div>
  );
};

const AutoplayCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!api || !playing) return;
    const id = window.setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 3000);
    return () => window.clearInterval(id);
  }, [api, playing]);

  return (
    <div className="w-full max-w-md">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.title}>
              <div
                className={cn(
                  "flex aspect-[16/9] items-end rounded-xl bg-gradient-to-br p-6 text-white",
                  slide.color,
                )}
              >
                <span className="text-lg font-medium">{slide.title}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4" />
        <CarouselNext className="-right-4" />
      </Carousel>
      <CarouselDots api={api} />
      <Button
        variant="outline"
        size="sm"
        className="mt-3"
        onClick={() => setPlaying((v) => !v)}
      >
        {playing ? "Pause autoplay" : "Resume autoplay"}
      </Button>
    </div>
  );
};

export const CarouselPage = () => {
  const [imageApi, setImageApi] = useState<CarouselApi>();

  const onImageApi = useCallback((next: CarouselApi) => setImageApi(next), []);

  return (
    <div className="space-y-10">
      <PageHeader
        title="Carousel"
        description="Embla-powered sliders for images, cards, and autoplay galleries."
        badge="Component"
      />

      <ComponentSection
        title="Image Carousel"
        description="Full-width slides with previous/next controls and dot indicators."
        source="shadcn"
        shadcnComponent="carousel"
        code={`import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

<Carousel setApi={setApi}>
  <CarouselContent>
    {slides.map((slide) => (
      <CarouselItem key={slide.title}>
        <div className="aspect-video rounded-xl bg-gradient-to-br …">{slide.title}</div>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`}
      >
        <div className="w-full max-w-md px-8">
          <Carousel setApi={onImageApi}>
            <CarouselContent>
              {slides.map((slide) => (
                <CarouselItem key={slide.title}>
                  <div
                    className={cn(
                      "flex aspect-[16/9] items-end rounded-xl bg-gradient-to-br p-6 text-white",
                      slide.color,
                    )}
                  >
                    <span className="text-lg font-medium">{slide.title}</span>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <CarouselDots api={imageApi} />
        </div>
      </ComponentSection>

      <ComponentSection
        title="Card Carousel"
        description="Pricing or feature cards in a horizontal slider."
        source="shadcn"
        shadcnComponent="carousel"
        code={`<Carousel opts={{ align: "start" }} className="w-full max-w-sm">
  <CarouselContent>
    {plans.map((plan) => (
      <CarouselItem key={plan.title} className="basis-4/5">
        <Card>...</Card>
      </CarouselItem>
    ))}
  </CarouselContent>
</Carousel>`}
      >
        <Carousel opts={{ align: "start" }} className="w-full max-w-sm">
          <CarouselContent>
            {cardSlides.map((plan) => (
              <CarouselItem key={plan.title} className="basis-4/5">
                <Card>
                  <CardHeader>
                    <CardTitle>{plan.title}</CardTitle>
                    <CardDescription>{plan.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-semibold">{plan.price}</p>
                    <p className="text-sm text-muted-foreground">per month</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4" />
          <CarouselNext className="-right-4" />
        </Carousel>
      </ComponentSection>

      <ComponentSection
        title="Autoplay"
        description="Auto-advances every 3 seconds — pause with the toggle button."
        source="shadcn"
        shadcnComponent="carousel"
        code={`useEffect(() => {
  if (!api || !playing) return;
  const id = setInterval(() => {
    api.canScrollNext() ? api.scrollNext() : api.scrollTo(0);
  }, 3000);
  return () => clearInterval(id);
}, [api, playing]);`}
      >
        <AutoplayCarousel />
      </ComponentSection>
    </div>
  );
};
