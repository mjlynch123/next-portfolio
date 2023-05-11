const router = require("express").Router();
const { User } = require("../models");
const Inquiry = require("../models/inquiry");
const Project = require("../models/project")

router.get("/", async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id);
    const project = await Project.findAll();
    
    res.render("homepage", { loggedIn: req.session.loggedIn, user, project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/login", async (req, res) => {
  res.render("login", { loggedIn: req.session.loggedIn });
});

router.get("/dashboard", async (req, res) => {
  try {
    // Finding the user
    const user = await User.findByPk(req.session.user_id);
    const inquiries = await Inquiry.findAll();
    
    res.render("dashboard", {
      loggedIn: req.session.loggedIn,
      user,
      inquiries,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/new", async (req, res) => {
  res.render("addNew", { loggedIn: req.session.loggedIn });
});

router.post("/inquiry", async (req, res) => {
  try {
    // Extract the form data from the request body
    const { name, email, message } = req.body;

    // Insert the data into the Contact table
    Inquiry.create({ name, email, message });
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error submitting contact form");
  }
});

router.post('/newProject', async (req, res) => {
  try {
    console.log(req.body)
    const { project_image, project_name, project_languages, project_description, project_live_url, project_github_link } = req.body;
    
    const newProject = {
      name: project_name,
      languages: project_languages,
      description: project_description,
      live_url: project_live_url,
      github_link: project_github_link,
      image: project_image
    }

    const project = await Project.create(newProject);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

router.get("/project/:id", async (req,res) => {
  const project = await Project.findOne({ where: { id: req.params.id } });
  console.log(project);
  res.render("singleProject", { loggedIn: req.session.loggedIn, project })
});

router.get("/inquiry/:id", async (req, res) => {
  const inquiry = await Inquiry.findOne({ where: { id: req.params.id } });
  res.render("inquiry", { loggedIn: req.session.loggedIn, inquiry });
});


router.post("/delete/:id", async (req, res) => {
  try {
    const inquiry = await Inquiry.findOne({ where: { id: req.params.id } });

    if (!inquiry) {
      return res.status(404).send("Inquiry not found");
    }

    await inquiry.destroy();
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while deleting the inquiry");
  }
});
module.exports = router;
