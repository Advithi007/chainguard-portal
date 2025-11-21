import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Shield, FileText, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { NavLink } from '@/components/NavLink';
import logoImg from '@/assets/ts-police-logo.png';

interface LayoutProps {
  children: ReactNode;
  userRole?: string;
  userName?: string;
  onLogout?: () => void;
}

export const Layout = ({ children, userRole, userName, onLogout }: LayoutProps) => {
  const navigate = useNavigate();

  const menuItems = [
    { title: 'Dashboard', url: '/dashboard', icon: Home },
    { title: 'All Cases', url: '/dashboard', icon: FileText },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r border-sidebar-border">
          <SidebarContent className="glass">
            <div className="p-6 border-b border-sidebar-border">
              <img src={logoImg} alt="Telangana State Police" className="h-24 w-auto mx-auto mb-2" />
              <div className="text-center">
                <p className="text-xs text-muted-foreground font-semibold tracking-wider">
                  CHAIN OF CUSTODY
                </p>
              </div>
            </div>

            {userName && (
              <div className="px-6 py-4 border-b border-sidebar-border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center security-pulse">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{userName}</p>
                    <p className="text-xs text-accent uppercase tracking-wide">
                      {userRole?.replace('_', ' ')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          className="hover:bg-sidebar-accent"
                          activeClassName="bg-sidebar-accent text-primary font-semibold"
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {onLogout && (
              <div className="mt-auto p-4 border-t border-sidebar-border">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={onLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="h-16 border-b border-border flex items-center px-6 glass">
            <SidebarTrigger />
            <div className="ml-auto flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-muted-foreground">System Secure</span>
            </div>
          </header>
          
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};
