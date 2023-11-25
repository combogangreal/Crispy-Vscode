import importlib.util

# For illustrative purposes.
package_name = 'black'

spec = importlib.util.find_spec(package_name)
if spec is None:
    print("False")
else:
    print("True")