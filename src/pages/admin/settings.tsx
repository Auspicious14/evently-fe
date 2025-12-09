import { AdminLayout } from "@/components/layouts/AdminLayout";
import AuthGuard from "@/components/AuthGuard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Switch } from "@/components/ui/Switch";
import { useState } from "react";
import { toast } from "sonner";

const AdminSettingsPage = () => {
  const [settings, setSettings] = useState({
    siteName: "EventNaija",
    supportEmail: "support@eventnaija.com",
    maintenanceMode: false,
    allowRegistrations: true,
  });

  const handleSave = () => {
    // Here we would typically save to backend
    toast.success("Settings saved successfully");
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h2 className="text-2xl font-bold">Platform Settings</h2>
          <p className="text-muted-foreground">
            Manage general platform configuration.
          </p>
        </div>

        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">General</h3>

            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) =>
                  setSettings({ ...settings, siteName: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input
                id="supportEmail"
                type="email"
                value={settings.supportEmail}
                onChange={(e) =>
                  setSettings({ ...settings, supportEmail: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">System</h3>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Disable access to the public site
                </p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, maintenanceMode: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Allow Registrations</Label>
                <p className="text-sm text-muted-foreground">
                  Allow new users to sign up
                </p>
              </div>
              <Switch
                checked={settings.allowRegistrations}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, allowRegistrations: checked })
                }
              />
            </div>
          </div>

          <div className="pt-4">
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

const AdminSettings = () => {
  return (
    <AuthGuard>
      <AdminSettingsPage />
    </AuthGuard>
  );
};

export default AdminSettings;
