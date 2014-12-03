import nltk
from nltk.chunk.regexp import *

DefaultNpPattern = ''.join([r'(<DT|AT>?<RB>?)?',
			    r'<JJ.*|CD.*>*',
			    r'(<JJ.*|CD.*><,>)*',
			    r'(<N.*>)+'])
BaselineNpChunkRule = ChunkRule(DefaultNpPattern, 
                                'Default rule for NP chunking')
NpChunker = RegexpChunkParser([BaselineNpChunkRule], 
                              chunk_node='NP',top_node='S')

def generate_questions(prediction_question):
  tree = NpChunker.parse(nltk.pos_tag(nltk.word_tokenize(prediction_question)))
  print tree

if __name__ == '__main__':
  generate_questions('the court to define CHL players as employees of the league?')
