import urllib2
import helpers

GENERAL_QUESTIONS = ['What cases involve TOPICSs?',]
NP_QUESTIONS = ['What is the legal test for SING_DET NP?']

FUNCTION_NPS = set(['court', 'judge', 'appellant', 'plaintiff', 'defendant'])
FUNCTION_VPS = set(['define', 'determine', 'decide', 'rule', 'argue'])

def get_topics(sentences):
  nps = helpers.get_NPs(sentences)
  nps = set(nps.keys()).difference(FUNCTION_NPS)
  nps = helpers.order_by_deepest(nps)
  top_nps = nps[0:min(5, len(nps))]
  top_nps = [synset.name.split('.')[0] for synset in top_nps]

  vps = helpers.get_VPs(sentences)
  vps = set(vps.keys()).difference(FUNCTION_VPS)
  vps = helpers.order_by_deepest(vps)
  top_vps = vps[0:min(5, len(vps))]
  top_vps = [synset.name.split('.')[0] for synset in top_vps]

  return (top_nps, top_vps)

def get_singular_determiner(word):
  if word[0] in 'aeiou':
    return 'an'
  else:
    return 'a'

def check_if_legal_term(np):
  url = 'http://dictionary.law.com/Default.aspx?typed=%s&type=1' % np
  content = urllib2.urlopen(url).read()
  return 'class="definition"' in content

def generate_questions(prediction_question):
  (np_topics, vp_topics) = get_topics(prediction_question)

  if len(np_topics) != 2:
    general_questions = [question.replace('TOPICS', 's, '.join(np_topics))
                         for question in GENERAL_QUESTIONS]
  else:
    general_questions = [question.replace('TOPICS', ' and '.join(np_topics))
                         for question in GENERAL_QUESTIONS]

  np_questions = []
  for np in np_topics:
    if not check_if_legal_term(np):
      continue
    np_questions.extend([question.replace('SING_DET', get_singular_determiner(np)).replace('NP', np) for question in NP_QUESTIONS])
  return (general_questions, np_questions)

if __name__ == '__main__':
  print generate_questions('how likely is the court to define CHL players as employees?')
