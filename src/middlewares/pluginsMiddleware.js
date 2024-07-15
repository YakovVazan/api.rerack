import plugsServices from "../services/plugsServices.js";

const plugShouldBeUnique = async (req, res, next) => {
  try {
    const { name } = req.body;
    const plugId = req.params.id;
    const anotherPlug = await plugsServices.getPlug("name", name);
    const samePlugName =
      anotherPlug && anotherPlug?.name.toLowerCase() === name.toLowerCase();
    const samePlugId = anotherPlug?.id != plugId;

    if (samePlugName && samePlugId)
      return res
        .status(409)
        .json({ msg: "Plug with the same name already exists" });

    next();
  } catch (error) {
    return res.status(500).json({
      msg: "Plug should be unique related error",
      error: error.message,
    });
  }
};

export default { plugShouldBeUnique };
