import setuptools

setuptools.setup(
    name="marmalade",
    py_modules=["marmalade"],
    entry_points={"console_scripts": ["marmalade=marmalade.__main__:cli"]},
)
