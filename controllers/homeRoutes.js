const router = require("express").Router();
const { User } = require("../models");
const Inquiry = require("../models/inquiry");
const Project = require("../models/project")

router.get("/", async (req, res) => {
  try {
    const showNav = "true";
    const showFooter = "true";
    const user = await User.findByPk(req.session.user_id);
    const project = await Project.findAll();

    res.render("homepage", { loggedIn: req.session.loggedIn, user, project, showNav, showFooter });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/login", async (req, res) => {
  const showNav = "false";
  const showFooter = "false";
  res.render("login", { loggedIn: req.session.loggedIn, });
});

router.get("/dashboard", async (req, res) => {
  try {
    // Finding the user
    const showNav = "true";
    const showFooter = "true";
    const user = await User.findByPk(req.session.user_id);
    const inquiries = await Inquiry.findAll();

    res.render("dashboard", {
      loggedIn: req.session.loggedIn,
      user,
      inquiries,
      showNav,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/new", async (req, res) => {
  const showNav = "true";
  const showFooter = "true";
  res.render("addNew", { loggedIn: req.session.loggedIn, showNav, });
});

router.post("/inquiry", async (req, res) => {
  try {
    // Extract the form data from the request body
    const { name, email, message } = req.body;

    // Insert the data into the Contact table
    Inquiry.create({ name, email, message });
    res.redirect("/success");
  } catch (err) {
    res.redirect("/error")
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

router.get("/project/:id", async (req, res) => {
  const showNav = "true";
  const showFooter = "true";
  const project = await Project.findOne({ where: { id: req.params.id } });
  console.log(project);
  res.render("singleProject", { loggedIn: req.session.loggedIn, project, showNav })
  res.json(project);
});

router.get("/inquiry/:id", async (req, res) => {
  const showNav = "true";
  const showFooter = "true";
  const inquiry = await Inquiry.findOne({ where: { id: req.params.id } });
  res.render("inquiry", { loggedIn: req.session.loggedIn, inquiry, showNav, showNav });
});


router.post("/delete/:id", async (req, res) => {
  try {
    const inquiry = await Inquiry.findOne({ where: { id: req.params.id } });

    if (!inquiry) {
      return res.status(404).send("Inquiry not found");
    }

    await inquiry.destroy();
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while deleting the inquiry");
  }
});

// ! Create delete route for projects

router.post("/project/:id", async (req, res) => {
  try {
    const project = await Project.findOne({ where: { id: req.params.id } });

    if (!project) {
      return res.status(404).send("Project not found");
    }

    await project.destroy();
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while deleting the inquiry");
  }
});

router.post('/update/:id', async (req, res) => {
  try {
    const { image, name, languages, github_link, live_url, description } = req.body;
    const project = await Project.update({
      image,
      name,
      languages,
      github_link,
      live_url,
      description,
    }, {
      where: {
        id: req.params.id
      }
    });
    res.redirect(`/project/${req.params.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while updating the project.');
  }
})

router.get("/success", async (req, res) => {
  const showNav = "false";
  const showFooter = "false";
  res.render("contact-success");
});

router.get("/error", async (req, res) => {
  const showNav = "false";
  const showFooter = "false";
  res.render("failure");
});

module.exports = router;
