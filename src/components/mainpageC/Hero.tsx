import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <div className="relative h-screen">
       <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('/bg1.png')",
          backgroundSize: "cover", // Ensures the image covers the entire div
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat" // Prevents repetition
        }}
      >
        <div className="absolute inset-0 " />
      </div>
      
      <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
        <h1 className={cn(
          "text-5xl md:text-7xl font-serif text-center",
          "tracking-wider leading-tight mb-6"
        )}>
          
          <br />
          
        </h1>
        
        <div className="absolute bottom-0 w-full bg-black py-0 overflow-hidden"> {/* Reduced py-2 to py-1 */}
  <div className="animate-marquee whitespace-nowrap text-white text-lg tracking-wide"> {/* Reduced text size & tracking */}
    {Array(3).fill("").map((_, i) => (
      <span key={i} className="mx-3"> {/* Reduced margin */}
        END OF SEASON SALE IS LIVE 
        <span className="mx-4"> {/* Reduced spacing */}
          USE CODE - WELCOME FOR 10% OFF
        </span>
      </span>
    ))}
  </div>




        </div>
      </div>
    </div>
  );
}