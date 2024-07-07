import * as React from "react";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import Button from "@/components/button";
import Input from "@/components/input";
import Select from "@/components/select";
import Checkbox from "@/components/checkbox";
import Alert from "@/components/alert";

const ComponentTesting = () => {
    const [alertOpen, setAlertOpen] = React.useState(false);

    return (
        <div
            className={`flex min-h-screen w-full flex-col items-center gap-10 ${inter.className} bg-purple-50 text-slate-700 dark:bg-slate-900 dark:text-slate-300`}
        >
            <h1>Component Testing</h1>
            <p>Testing the component</p>

            <div>
                <h1 className="text-2xl">Buttons</h1>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="disabled">Disabled</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="success">Success</Button>
            </div>

            <div>
                <h1 className="text-2xl">Selects</h1>
                <Select
                    variant="default"
                    options={[
                        {
                            value: "1",
                            label: "Option 1",
                        },
                        {
                            value: "2",
                            label: "Option 2",
                        },
                        {
                            value: "3",
                            label: "Option 3",
                        },
                    ]}
                ></Select>
                <Select
                    variant="disabled"
                    options={[
                        {
                            value: "1",
                            label: "Option 1",
                        },
                        {
                            value: "2",
                            label: "Option 2",
                        },
                        {
                            value: "3",
                            label: "Option 3",
                        },
                    ]}
                ></Select>
            </div>

            <div>
                <h1 className="text-2xl">Inputs</h1>
                <Input placeholder="Default" />
                <Input placeholder="Error" variant="error" />
                <Input placeholder="Success" variant="success" />
                <Input placeholder="Disabled" variant="disabled" />
            </div>

            <div>
                <h1 className="text-2xl">Checkbox</h1>
                <Checkbox label="Default" variant="default" />
                <Checkbox label="Disabled" variant="disabled" />
            </div>

            <div>
                <h1 className="text-2xl">Alert</h1>
                <Button
                    onClick={() => {
                        setAlertOpen(true);
                    }}
                    variant="primary"
                >
                    Open Alert
                </Button>

                <Alert title="Alert Title" dismissible={true} open={alertOpen} setOpen={setAlertOpen}>
                    This is the alert description
                </Alert>
            </div>
        </div>
    );
};

export default ComponentTesting;
