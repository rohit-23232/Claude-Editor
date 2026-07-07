import express from "express";

const router = express.Router();

let settings = {

    defaultProvider: "claude",

    temperature: 0.7,

    maxTokens: 4096

};

router.get("/", (req, res) => {

    res.json({

        success: true,

        settings

    });

});

router.post("/", (req, res) => {

    settings = {

        ...settings,

        ...req.body

    };

    res.json({

        success: true,

        settings

    });

});

export default router;
