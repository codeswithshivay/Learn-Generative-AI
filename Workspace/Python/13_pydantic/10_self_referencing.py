# Video 98 - Self Referencing Models in Pydantic
from pydantic import BaseModel
from typing import Optional, List

# Node
class Node(BaseModel):
    id: str
    children: Optional[List['Node']] = []

Node.model_rebuild()
# Tree node
tree_node = Node(id='root', children=[
    Node(id='child-1'),
    Node(id='child-2'),
    Node(id='child-3', children=[
        Node(id='child-3-1'),
    ])
])

print(tree_node.model_dump_json(indent=2))