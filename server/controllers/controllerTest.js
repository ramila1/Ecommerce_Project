export const controllerTest = (req, res) => {
    res.statusCode = 200;
    res.send({
        message: "Test Routes",
        success: true
    });
};