# TODO https://django-extensions.readthedocs.io/en/latest/graph_models.html#example-usage
# Create a dot file
python manage.py graph_models -a > vps.dot

# Create a PNG image file called my_project_visualized.png with application grouping
python manage.py graph_models -a -g -o vps_visualized.png
# infer applications from settings.py


# Same example but with explicit selection of pygraphviz or pydot
# python manage.py graph_models --pygraphviz -a -g -o my_project_visualized.png
# python manage.py graph_models --pydot -a -g -o my_project_visualized.png

# Create a dot file for only the 'foo' and 'bar' applications of your project
# python manage.py graph_models foo bar > my_project.dot

# Create a graph for only certain models
# python manage.py graph_models -a -I Foo,Bar -o my_project_subsystem.png

# Create a graph excluding certain models
# python manage.py graph_models -a -X Foo,Bar -o my_project_sans_foo_bar.png

# Create a graph including models matching a given pattern and excluding some of them
# It will first select the included ones, then filter out the ones to exclude
# python manage.py graph_models -a -I Product* -X *Meta -o my_project_products_sans_meta.png

# Create a graph without showing its edges' labels
# python manage.py graph_models -a --hide-edge-labels -o my_project_sans_foo_bar.png

# Create a graph with 'normal' arrow shape for relations
# python manage.py graph_models -a --arrow-shape normal -o my_project_sans_foo_bar.png