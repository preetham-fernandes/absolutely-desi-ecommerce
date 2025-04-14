import Link from "next/link"

interface CategoryLink {
  title: string
  href: string
}

interface CategorySection {
  title: string
  links: CategoryLink[]
}

interface MegaMenuProps {
  sections: CategorySection[]
  featuredItems?: {
    title: string
    items: {
      title: string
      href: string
      imageSrc?: string
    }[]
  }
}

export function MegaMenu({ sections, featuredItems }: MegaMenuProps) {
  return (
    <div className="bg-white text-black shadow-lg rounded-b-lg border-t border-gray-200 animate-in fade-in zoom-in-95 duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-4 gap-6 p-6">
          {sections.map((section, index) => (
            <div key={index} className="space-y-3">
              <h3 className="font-semibold text-gray-900 uppercase text-sm tracking-wider">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href} className="text-gray-600 hover:text-black text-sm transition-colors">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {featuredItems && (
            <div className="col-span-1">
              <h3 className="font-semibold text-gray-900 uppercase text-sm tracking-wider mb-3">
                {featuredItems.title}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {featuredItems.items.map((item, index) => (
                  <Link key={index} href={item.href} className="block group">
                    {item.imageSrc && (
                      <div className="aspect-square bg-gray-100 rounded-md overflow-hidden mb-1">
                        <div
                          className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                          style={{ backgroundImage: `url(${item.imageSrc})` }}
                        />
                      </div>
                    )}
                    <span className="text-xs text-gray-700 group-hover:text-black">{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
