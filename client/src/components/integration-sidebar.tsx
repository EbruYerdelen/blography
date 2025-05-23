"use client";

import { logout } from "@/app/actions/logout";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { createDocument, Document, fetchDocuments } from "@/services/document";
import {
  Check,
  ChevronDown,
  CuboidIcon as Cube,
  FileText,
  FolderOpen,
  LayoutGrid,
  Loader2,
  LogOut,
  PanelRight,
  Plus,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { toast } from "sonner";

export function MinimalIntegrationSidebar() {
  const [isCreatingDoc, setIsCreatingDoc] = useState(false);
  const [newDocName, setNewDocName] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [documents, setDocuments] = useState<Document>();
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const data = await fetchDocuments();
        setDocuments(data);
      } catch (error) {
        console.error("Error fetching documents:", error);
        toast.error("Failed to fetch documents");
      } finally {
        setIsLoading(false);
      }
    };

    loadDocuments();
  }, []);

  const handleCreateDocument = async () => {
    if (!newDocName.trim()) return;

    setIsCreating(true);
    const tempId = Date.now().toString();

    setDocuments((prev) => ({
      ...prev,
      data: [
        ...(prev?.data || []),
        {
          _id: tempId,
          title: newDocName,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userId: "placeholder-user-id",
        },
      ],
    }));

    try {
      const response = await createDocument(newDocName);

      setDocuments((prev) => ({
        ...prev,
        data: (prev?.data || []).map((doc) =>
          doc._id === tempId ? response?.data : doc
        ),
      }));

      router.push(`/docs/${response?.data._id}`);

      toast.success("Document created successfully");
    } catch (error) {
      console.error("Error creating document:", error);

      setDocuments((prev) => ({
        ...prev,
        data: (prev?.data || []).filter((doc) => doc._id !== tempId),
      }));

      toast.error("Failed to create document");
    } finally {
      setIsCreating(false);
      setIsCreatingDoc(false);
      setNewDocName("");
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  };

  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={0}>
      <Sidebar
        collapsible="icon"
        className="relative flex flex-col bg-background border-r border-border text-foreground transition-all duration-300 ease-in-out"
      >
        {/* Header with Blography Logo */}
        <SidebarHeader className="flex flex-row group-data-[collapsible=icon]:flex-col justify-between w-full">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className={cn(
                "flex items-center gap-2",
                "group-data-[collapsible=icon]:flex-col"
              )}
              aria-label="Blography Home"
            >
              <Cube className="ml-1 w-6 h-6" />
              <span className="group-data-[collapsible=icon]:hidden font-semibold text-foreground">
                Blography
              </span>
            </Link>
          </div>
          <SidebarMenuButton
            tooltip="Toggle Sidebar"
            className="flex justify-center items-center w-8 h-8"
            asChild
          >
            <SidebarTrigger>
              <PanelRight className="w-4 h-4" />
            </SidebarTrigger>
          </SidebarMenuButton>
        </SidebarHeader>

        <SidebarContent className="flex-1 gap-0">
          {/* Main Navigation */}
          <SidebarGroup className="flex-1">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Home"
                  className="flex justify-start group-data-[collapsible=icon]:justify-center items-center gap-2 px-2 py-1.5 w-full text-sm"
                >
                  <Link
                    href="/home"
                    data-active={pathname === "/home"}
                    className="flex group-data-[collapsible=icon]:justify-center items-center gap-2 w-full text-muted-foreground"
                  >
                    <LayoutGrid className="w-4 h-4 shrink-0" />
                    <span className="group-data-[collapsible=icon]:hidden truncate">
                      Home
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Documents Section */}
              <SidebarMenuItem>
                <Collapsible defaultOpen={true} className="w-full">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip="My Documents"
                      className="flex group-data-[collapsible=icon]:justify-center items-center gap-2 hover:bg-accent px-2 py-1.5 w-full text-muted-foreground hover:text-foreground text-sm"
                    >
                      <FolderOpen className="w-4 h-4 shrink-0" />
                      <span className="group-data-[collapsible=icon]:hidden font-medium truncate tracking-wide">
                        My Documents
                      </span>
                      <ChevronDown className="group-data-[collapsible=icon]:hidden ml-auto w-4 h-4 group-data-[state=open]/collapsible:rotate-180 transition-transform shrink-0" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <ScrollArea className="h-auto max-h-70">
                      <div className="space-y-1">
                        <div className="top-0 sticky ml-4 group-data-[collapsible=icon]:ml-0 px-2 group-data-[collapsible=icon]:px-0 border-border border-l border-dashed">
                          {isCreatingDoc ? (
                            <form
                              className="group-data-[collapsible=icon]:hidden flex items-center gap-1"
                              onSubmit={(e) => {
                                e.preventDefault();
                                handleCreateDocument();
                              }}
                            >
                              <Input
                                name="name"
                                placeholder="Document name"
                                value={newDocName}
                                onChange={(e) => setNewDocName(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Escape") {
                                    e.preventDefault();
                                    setIsCreatingDoc(false);
                                    setNewDocName("");
                                  }
                                }}
                                className="dark:bg-muted h-8 text-sm"
                                autoFocus
                              />
                              <div className="flex gap-1">
                                <SidebarMenuButton
                                  size="sm"
                                  tooltip="Create document"
                                  className="w-8 h-8"
                                  disabled={!newDocName.trim() || isCreating}
                                  type="submit"
                                >
                                  {isCreating ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <Check className="w-4 h-4" />
                                  )}
                                </SidebarMenuButton>
                                <SidebarMenuButton
                                  type="button"
                                  size="sm"
                                  tooltip="Cancel"
                                  className="w-8 h-8"
                                  onClick={() => {
                                    setIsCreatingDoc(false);
                                    setNewDocName("");
                                  }}
                                  disabled={isCreating}
                                >
                                  <X className="w-4 h-4" />
                                </SidebarMenuButton>
                              </div>
                            </form>
                          ) : (
                            <SidebarMenuButton
                              variant="outline"
                              size="sm"
                              tooltip="New Document"
                              className="flex justify-start group-data-[collapsible=icon]:justify-center items-center gap-2 bg-background dark:bg-muted group-data-[collapsible=icon]:pr-0 pl-2 group-data-[collapsible=icon]:pl-0 border border-border w-full h-8 group-data-[collapsible=icon]:size-8 text-sm"
                              onClick={() => setIsCreatingDoc(true)}
                              data-new-doc-trigger
                              disabled={isCreatingDoc || isCreating}
                            >
                              <Plus className="w-4 h-4 shrink-0" />
                              <span className="group-data-[collapsible=icon]:hidden">
                                New Document
                              </span>
                            </SidebarMenuButton>
                          )}
                        </div>
                        {isLoading ? (
                          <div className="flex justify-center ml-4 group-data-[collapsible=icon]:ml-0 px-2 group-data-[collapsible=icon]:px-0 py-2 border-border border-l border-dashed">
                            <Loader2 className="w-4 h-4 animate-spin" />
                          </div>
                        ) : (
                          Array.isArray(documents?.data) &&
                          documents?.data?.map((doc) => (
                            <div
                              key={doc._id}
                              className="ml-4 group-data-[collapsible=icon]:ml-0 px-2 group-data-[collapsible=icon]:px-0 border-border border-l border-dashed"
                            >
                              <SidebarMenuButton
                                asChild
                                tooltip={doc.title}
                                data-active={
                                  pathname.split("/").at(-1) === doc._id
                                }
                                className="flex group-data-[collapsible=icon]:justify-center items-center gap-2 hover:bg-accent px-2 py-1.5 rounded-lg w-full text-muted-foreground text-sm hover:text-accent-foreground"
                              >
                                <Link href={`/docs/${doc._id}`}>
                                  <FileText className="w-4 h-4 shrink-0" />
                                  <span className="group-data-[collapsible=icon]:hidden truncate">
                                    {doc.title}
                                  </span>
                                </Link>
                              </SidebarMenuButton>
                            </div>
                          ))
                        )}
                      </div>
                    </ScrollArea>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarGroup className="mt-auto pt-2 border-t border-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Logout"
                className="flex group-data-[collapsible=icon]:justify-center items-center gap-2 hover:bg-accent px-2 py-1.5 w-full text-muted-foreground hover:text-foreground text-sm"
                onClick={handleLogout}
              >
                {isLoggingOut ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <LogOut className="w-4 h-4 shrink-0" />
                )}
                <span className="group-data-[collapsible=icon]:hidden truncate">
                  Logout
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarRail />
      </Sidebar>
    </TooltipProvider>
  );
}
