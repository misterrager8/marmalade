import setuptools

setuptools.setup(
    name="marmalade",
    entry_points={"console_scripts": ["marmalade=marmalade.__main__:cli"]},
)
