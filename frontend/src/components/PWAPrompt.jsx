import React, { useState, useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { Button, Snackbar, Alert, Box } from '@mui/material';
import InstallMobileIcon from '@mui/icons-material/InstallMobile';
import SystemUpdateIcon from '@mui/icons-material/SystemUpdate';

export const PWAPrompt = () => {
    // 1. Manages updates and offline readiness
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            // console.log('SW Registered: ' + r)
        },
        onRegisterError(error) {
            console.error('SW registration error', error);
        },
    });

    // 2. Manages installation prompt (for users who don't have the app)
    const [installPrompt, setInstallPrompt] = useState(null);

    useEffect(() => {
        const handler = (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setInstallPrompt(e);
            console.log("PWA Install Prompt captured");
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (!installPrompt) return;
        installPrompt.prompt();
        const { outcome } = await installPrompt.userChoice;
        console.log(`User response to install prompt: ${outcome}`);
        // We don't clear the prompt immediately in case they cancel, 
        // but usually the event is one-time use.
        if (outcome === 'accepted') {
            setInstallPrompt(null);
        }
    };

    const handleUpdate = () => {
        updateServiceWorker(true);
    };

    // If app is installed (standalone mode), usually installPrompt won't fire.
    // We can also check:
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

    if (isStandalone && !needRefresh) return null; // "Perfecta que no aparezca nada"

    return (
        <>
            {/* SCENARIO 1: UPDATE AVAILABLE (Priority) */}
            <Snackbar
                open={needRefresh}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                sx={{ bottom: { xs: 90, sm: 24 } }} // Avoid overlapping with navigation if any
            >
                <Alert
                    severity="info"
                    variant="filled"
                    icon={<SystemUpdateIcon />}
                    action={
                        <Button color="inherit" size="small" onClick={handleUpdate} sx={{ fontWeight: 'bold' }}>
                            ACTUALIZAR
                        </Button>
                    }
                    sx={{ width: '100%', boxShadow: 6 }}
                >
                    ¡Nueva versión disponible!
                </Alert>
            </Snackbar>

            {/* SCENARIO 2: INSTALL AVAILABLE (Only if not needing refresh) */}
            {/* We use a visible persistent banner or a snackbar? User said "que les aparezca" */}
            {/* A persistent banner at the bottom might be better for "Install", but Snackbar is less intrusive. */}
            {/* Let's use a Snackbar that is persistent if installable */}

            {installPrompt && !needRefresh && !isStandalone && (
                <Snackbar
                    open={!!installPrompt}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    sx={{ bottom: { xs: 30, sm: 30 } }}
                >
                    <Alert
                        severity="success"
                        variant="filled"
                        icon={<InstallMobileIcon />}
                        action={
                            <Button color="inherit" size="small" onClick={handleInstall} sx={{ fontWeight: 'bold', bgcolor: 'rgba(255,255,255,0.2)' }}>
                                INSTALAR APP
                            </Button>
                        }
                        sx={{
                            width: '100%',
                            boxShadow: 6,
                            bgcolor: '#00d4aa', // Theme color
                            color: '#000'
                        }}
                    >
                        Instala TuEnergíaMaya
                    </Alert>
                </Snackbar>
            )}
        </>
    );
};
