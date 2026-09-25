import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Mail,
  MailOpen,
  Trash2,
  RefreshCw,
  Lock,
  Inbox,
  Calendar,
  User,
  AtSign,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  isRead: boolean;
  createdAt: number;
}

const ADMIN_TOKEN_KEY = "darwish_admin_token";

export default function AdminInbox() {
  const [token, setToken] = useState<string>(() => sessionStorage.getItem(ADMIN_TOKEN_KEY) || "");
  const [tokenInput, setTokenInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const fetchMessages = useCallback(async (authToken: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/messages", {
        headers: { "x-admin-token": authToken },
      });
      const data = await res.json();
      if (data.success) {
        setMessages(data.messages);
        setUnreadCount(data.unreadCount);
        setIsAuthenticated(true);
        sessionStorage.setItem(ADMIN_TOKEN_KEY, authToken);
      } else {
        setIsAuthenticated(false);
        sessionStorage.removeItem(ADMIN_TOKEN_KEY);
        toast.error("Invalid admin token. Please try again.");
      }
    } catch {
      toast.error("Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-login if token is stored in session
  useEffect(() => {
    if (token) {
      fetchMessages(token);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) return;
    setToken(tokenInput);
    fetchMessages(tokenInput);
  };

  const handleLogout = () => {
    setToken("");
    setTokenInput("");
    setIsAuthenticated(false);
    setMessages([]);
    setSelectedMessage(null);
    sessionStorage.removeItem(ADMIN_TOKEN_KEY);
  };

  const handleMarkRead = async (msg: Message) => {
    if (msg.isRead) return;
    try {
      await fetch(`/api/admin/messages/${msg.id}/read`, {
        method: "PATCH",
        headers: { "x-admin-token": token },
      });
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, isRead: true } : m))
      );
      setUnreadCount((c) => Math.max(0, c - 1));
    } catch {
      toast.error("Failed to mark as read.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "DELETE",
        headers: { "x-admin-token": token },
      });
      const data = await res.json();
      if (data.success) {
        const deleted = messages.find((m) => m.id === id);
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (deleted && !deleted.isRead) setUnreadCount((c) => Math.max(0, c - 1));
        if (selectedMessage?.id === id) setSelectedMessage(null);
        toast.success("Message deleted.");
      }
    } catch {
      toast.error("Failed to delete message.");
    }
  };

  const handleSelectMessage = (msg: Message) => {
    setSelectedMessage(msg);
    handleMarkRead(msg);
  };

  const formatDate = (ts: number) =>
    new Date(ts).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // ── Login Screen ─────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-secondary/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="font-heading text-2xl text-foreground">Admin Inbox</CardTitle>
            <p className="text-muted-foreground text-sm mt-1">
              Enter your admin token to access contact messages
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Admin token"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                className="h-12 text-center tracking-widest"
                autoFocus
              />
              <Button
                type="submit"
                className="w-full h-12 bg-primary text-white hover:bg-primary/90 font-bold rounded-none"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Access Inbox"}
              </Button>
            </form>
            <p className="text-center text-xs text-muted-foreground mt-4">
              Darwish & Co. — Admin Portal
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ── Inbox Screen ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-secondary/10 font-body">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="site-container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Inbox className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-lg text-foreground">Contact Inbox</h1>
              <p className="text-xs text-muted-foreground">Darwish & Co. — Admin Portal</p>
            </div>
            {unreadCount > 0 && (
              <Badge className="bg-primary text-white ml-2">{unreadCount} unread</Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.assign("/admin/client-access")}
              className="rounded-none"
            >
              Client Access
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchMessages(token)}
              disabled={loading}
              className="gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-2 text-destructive border-destructive/30 hover:bg-destructive/10"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="site-container max-w-6xl mx-auto px-4 py-6">
        {messages.length === 0 ? (
          <div className="text-center py-24">
            <Inbox className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="font-heading text-xl font-bold text-muted-foreground">No messages yet</h2>
            <p className="text-muted-foreground text-sm mt-2">
              Contact form submissions will appear here.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Message List */}
            <div className="lg:col-span-2 space-y-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => handleSelectMessage(msg)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    selectedMessage?.id === msg.id
                      ? "border-primary bg-primary/5 shadow-md"
                      : msg.isRead
                      ? "border-border bg-white"
                      : "border-primary/30 bg-primary/5 shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      {msg.isRead ? (
                        <MailOpen className="w-4 h-4 text-muted-foreground shrink-0" />
                      ) : (
                        <Mail className="w-4 h-4 text-primary shrink-0" />
                      )}
                      <span
                        className={`font-semibold text-sm truncate ${
                          msg.isRead ? "text-foreground" : "text-primary"
                        }`}
                      >
                        {msg.name}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {formatDate(msg.createdAt).split(",")[0]}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 truncate">{msg.email}</p>
                  <p className="text-sm text-foreground mt-1 truncate">
                    {msg.subject || "(no subject)"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{msg.message}</p>
                </div>
              ))}
            </div>

            {/* Message Detail */}
            <div className="lg:col-span-3">
              {selectedMessage ? (
                <Card className="border-0 shadow-lg">
                  <CardHeader className="pb-4 border-b border-border">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="font-heading text-xl text-foreground">
                          {selectedMessage.subject || "(no subject)"}
                        </CardTitle>
                        <div className="flex flex-col gap-1 mt-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="w-4 h-4" />
                            <span>{selectedMessage.name}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <AtSign className="w-4 h-4" />
                            <a
                              href={`mailto:${selectedMessage.email}`}
                              className="text-primary hover:underline"
                            >
                              {selectedMessage.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(selectedMessage.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(selectedMessage.id)}
                        className="gap-2 text-destructive border-destructive/30 hover:bg-destructive/10 shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-foreground">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      Message
                    </div>
                    <div className="bg-secondary/30 rounded-lg p-4 text-foreground leading-relaxed whitespace-pre-wrap text-sm">
                      {selectedMessage.message}
                    </div>
                    <div className="mt-6 flex gap-3">
                      <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || ""}`}>
                        <Button className="bg-primary text-white hover:bg-primary/90 rounded-none gap-2">
                          <Mail className="w-4 h-4" />
                          Reply via Email
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <MailOpen className="w-12 h-12 text-muted-foreground/30 mb-3" />
                  <p className="text-muted-foreground">Select a message to read it</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
