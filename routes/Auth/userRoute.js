const router = require("express").Router();
const bcrypt = require("bcrypt");
let User = require("../../models/Auth/userModel");

router.route("/").get((req, res) => {
	User.find()
		.then((users) => res.json(users))
		.catch((err) => res.status(400).json("ERROR: " + err));
});

router.post("/add", async (req, res) => {
	//hashes the password
	const salt = await bcrypt.genSalt(10);
	const hashPassword = bcrypt.hashSync(req.body.password, salt);

	//sotres new user with hashed password
	const newUser = new User({
		userName: req.body.userName,
		password: hashPassword,
	});
	try {
		newUser.save();
		res.json({ success: true });
	} catch (err) {
		res.status(400).send(err);
	}
});

router.post("/login", async (req, res) => {
	const user = await User.findOne({ userName: req.body.userName });
	if (!user) return res.json({ success: false, msg: "user does not exist" });
	const validPass = await bcrypt.compare(req.body.password, user.password);
	if (!validPass)
		return res.json({ success: false, msg: "password does not match" });
	res.json({ success: true, user: user });
});

module.exports = router;
