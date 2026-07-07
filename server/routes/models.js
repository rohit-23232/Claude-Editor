import express from "express";
import { getProviders } from "../providers/router.js";

const router = express.Router();

router.get("/", (req, res) => {

    res.json({

        success: true,

        providers: getProviders()

    });

});

router.get("/:provider", (req, res) => {

    const providers = getProviders();

    const provider = providers[req.params.provider];

    if (!provider) {

        return res.status(404).json({

            success: false,

            error: "Provider not found"

        });

    }

    res.json({

        success: true,

        provider

    });

});

export default router;
