import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserCircle, Mail, Save, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Profile = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [displayName, setDisplayName] = useState("");
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate("/auth");
                return;
            }
            setUser(session.user);
            setDisplayName(session.user.user_metadata.display_name || "");
            setLoading(false);
        };

        checkUser();
    }, [navigate]);

    const handleUpdate = async () => {
        setUpdating(true);
        try {
            const { error } = await supabase.auth.updateUser({
                data: { display_name: displayName },
            });

            if (error) throw error;

            toast({
                title: "Profile updated",
                description: "Your display name has been updated successfully.",
            });
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-1 container py-24 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md mx-auto"
                >
                    <Card className="p-8 glass-panel border-primary/10">
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                <UserCircle className="w-10 h-10 text-primary" />
                            </div>
                            <h1 className="text-2xl font-bold">Your Profile</h1>
                            <p className="text-muted-foreground">Manage your account settings</p>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-muted-foreground" />
                                    Email
                                </label>
                                <Input value={user?.email} disabled className="bg-muted" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <UserCircle className="w-4 h-4 text-muted-foreground" />
                                    Display Name
                                </label>
                                <Input
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    placeholder="Enter your display name"
                                />
                            </div>

                            <Button
                                onClick={handleUpdate}
                                disabled={updating}
                                className="w-full"
                            >
                                {updating ? (
                                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                ) : (
                                    <Save className="w-4 h-4 mr-2" />
                                )}
                                Save Changes
                            </Button>
                        </div>
                    </Card>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
};

export default Profile;
