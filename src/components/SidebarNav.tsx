import { cn } from '../lib/utils'
import { Button } from '../primitives/Button'
import { ScrollArea } from '../primitives/ScrollArea'

interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  label?: string
}

interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

const SidebarNavItems = ({
  items,
  pathname,
}: {
  items: NavItem[]
  pathname: string | null
}) => {
  return items.length ? (
    <div className='grid grid-flow-row text-sm auto-rows-max'>
      {items.map((item, index) =>
        item.href && !item.disabled ? (
          <a
            className={cn(
              'group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline',
              item.disabled && 'cursor-not-allowed opacity-60',
              pathname === item.href
                ? 'font-medium text-foreground'
                : 'text-muted-foreground'
            )}
            key={index}
            href={item.href}
            target={item.external ? '_blank' : ''}
            rel={item.external ? 'noreferrer' : ''}
          >
            {item.title}
            {item.label && (
              <span className='ml-2 rounded-md bg-accent px-1.5 py-0.5 text-xs leading-none text-accent-foreground no-underline group-hover:no-underline'>
                {item.label}
              </span>
            )}
          </a>
        ) : (
          <span
            key={index}
            className={
              'flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline'
            }
          >
            {item.title}
            {item.label && (
              <span className='ml-2 rounded-md bg-muted px-1.5 py-0.5 text-xs leading-none text-muted-foreground no-underline group-hover:no-underline'>
                {item.label}
              </span>
            )}
          </span>
        )
      )}
    </div>
  ) : null
}

export const SidebarNav = ({ items }: { items: NavItemWithChildren[] }) => {
  return (
    // <div className='container flex-1 itesms-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10'>
    <aside className='fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block'>
      <ScrollArea dir={'ltr'} className='py-6 pr-6 lg:py-8'>
        {items.length ? (
          <div className='w-full'>
            {items.map((item, index) => (
              <div key={index} className={cn('pb-4')}>
                <h4 className='px-2 py-1 mb-1 text-sm font-semibold rounded-md'>
                  {item.title}
                </h4>
                {item?.items?.length && (
                  <SidebarNavItems items={item.items} pathname={'#'} />
                )}
              </div>
            ))}
          </div>
        ) : null}
      </ScrollArea>
    </aside>
    // </div>
  )
}
