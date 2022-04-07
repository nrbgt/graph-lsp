# Copyright (c) 2022 jupyterlab-graph-lsp contributors.
# Distributed under the terms of the Modified BSD License.


import shutil
from pathlib import Path

NODE = Path(
    shutil.which("node") or shutil.which("node.exe") or shutil.which("node.cmd")
).resolve()
STATIC = Path(__file__).parent / "static"
