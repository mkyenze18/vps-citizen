
# TODO https://pypi.org/project/pydot/
import pydot

graphs = pydot.graph_from_dot_file('vps_erd.dot')
graph = graphs[0]

graph.write_png('vps_erd_visulize.png')