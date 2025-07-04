import React, { useState } from 'react'

// Helper for delay
const wait = (ms) => new Promise((res) => setTimeout(res, ms))

const CHARACTER_OPTIONS = [
  'Darth Vader',
  'Yoda',
  'Darth Maul',
  'Luke Skywalker',
]

export default function EasterEggFlow({ onFinish }) {
  const [step, setStep] = useState('egg') // egg, q1, q1done, q2, done
  const [selected1, setSelected1] = useState(null)
  const [selected2, setSelected2] = useState(null)
  const [showQ2OptA, setShowQ2OptA] = useState(false)
  const [showQ2OptB, setShowQ2OptB] = useState(false)
  const [showSidePop, setShowSidePop] = useState(false)

  // Handle egg "break"
  const handleEggClick = async () => {
    setStep('egg-breaking')
    await wait(2000)
    setStep('q1')
  }

  // Handle Q1 option select
  const handleQ1Select = (idx) => setSelected1(idx)

  // Handle Q1 next
  const handleQ1Next = async () => {
    setStep('q1done')
    await wait(2000)
    setStep('q2')
    await wait(2000)
    setShowQ2OptA(true)
    await wait(2000)
    setShowQ2OptB(true)
    await wait(2000)
    setShowSidePop(true)
  }

  // Handle Q2 select
  const handleQ2Select = (idx) => setSelected2(idx)

  // Handle Q2 finish
  const handleQ2Next = () => setStep('done')

  // Handle final enter
  const handleFinalEnter = () => onFinish && onFinish()

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 9999,
        fontFamily: 'Orbitron, sans-serif',
        transition: 'background 0.6s',
        overflow: 'hidden',
      }}
    >
      {/* Easter Egg */}
      {step === 'egg' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <div
            style={{
              cursor: 'pointer',
              width: 260,
              height: 260,
              borderRadius: '50%',
              background:
                'radial-gradient(ellipse at 60% 40%, #fff 65%, #d90429 100%)',
              boxShadow: '0 0 80px 18px #d90429, 0 0 28px #fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 90,
              color: '#222',
              userSelect: 'none',
              transition: 'transform 0.4s',
            }}
            onClick={handleEggClick}
            title='Click the egg'
          >
            🥚
          </div>
          <div
            style={{
              background: 'rgba(24,24,27,0.92)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.45rem',
              borderRadius: 16,
              boxShadow: '0 0 16px #d90429',
              padding: '1.3em 2.1em',
              textShadow: '0 0 10px #d90429',
              animation: 'fadeIn 1s',
              maxWidth: 320,
            }}
          >
            Break the egg to get inside our darkest world ☠︎︎☠︎︎
          </div>
        </div>
      )}

      {/* Egg breaking animation */}
      {step === 'egg-breaking' && (
        <div
          style={{
            width: 180,
            height: 180,
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse at 60% 40%, #fff 65%, #d90429 100%)',
            boxShadow: '0 0 80px 18px #d90429, 0 0 28px #fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 90,
            color: '#222',
            transform: 'scale(1.2) rotate(-18deg)',
            opacity: 0.7,
            transition: 'all 0.7s cubic-bezier(.77,0,.18,1)',
            userSelect: 'none',
          }}
        >
          <span role='img' aria-label='broken-egg'>
            🥚
          </span>
        </div>
      )}

      {/* Question 1 */}
      {step === 'q1' && (
        <div
          style={{
            minWidth: 340,
            background: 'rgba(24,24,27,0.95)',
            borderRadius: 18,
            boxShadow: '0 0 32px #d90429',
            padding: '2.2em 2.6em',
            color: '#fff',
            textAlign: 'center',
            fontSize: '1.25rem',
            zIndex: 10,
            animation: 'fadeIn 0.7s',
          }}
        >
          <div style={{ fontWeight: 700, fontSize: '1.3em', marginBottom: 18 }}>
            Who&apos;s your favorite Star Wars character?
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              marginBottom: 20,
            }}
          >
            {CHARACTER_OPTIONS.map((opt, idx) => (
              <button
                key={opt}
                onClick={() => handleQ1Select(idx)}
                style={{
                  background: selected1 === idx ? '#d90429' : '#232326',
                  color: '#fff',
                  border: '2px solid #d90429',
                  borderRadius: 10,
                  fontWeight: 'bold',
                  fontSize: '1.05em',
                  padding: '0.7em 1.2em',
                  cursor: 'pointer',
                  boxShadow: selected1 === idx ? '0 0 12px #d90429' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                {String.fromCharCode(97 + idx)} - {opt}
              </button>
            ))}
          </div>
          <button
            onClick={handleQ1Next}
            disabled={selected1 === null}
            style={{
              marginTop: 12,
              background: selected1 !== null ? '#d90429' : '#444',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '0.8em 2.1em',
              fontWeight: 'bold',
              fontSize: '1.1em',
              cursor: selected1 !== null ? 'pointer' : 'not-allowed',
              boxShadow: selected1 !== null ? '0 0 18px #d90429' : 'none',
              letterSpacing: 1,
              transition: 'background 0.2s, transform 0.2s',
            }}
          >
            Next
          </button>
        </div>
      )}

      {/* Q1 Done Message */}
      {step === 'q1done' && (
        <div
          style={{
            background: 'rgba(24,24,27,0.95)',
            borderRadius: 18,
            boxShadow: '0 0 32px #d90429',
            padding: '2.2em 2.6em',
            color: '#fff',
            textAlign: 'center',
            fontSize: '1.35rem',
            fontWeight: 700,
            animation: 'fadeIn 0.7s',
          }}
        >
          WOW THAT&apos;S A NICE CHOICE.....
        </div>
      )}

      {/* Question 2 */}
      {step === 'q2' && (
        <div
          style={{
            minWidth: 340,
            background: 'rgba(24,24,27,0.95)',
            borderRadius: 18,
            boxShadow: '0 0 32px #d90429',
            padding: '2.2em 2.6em',
            color: '#fff',
            textAlign: 'center',
            fontSize: '1.25rem',
            zIndex: 10,
            animation: 'fadeIn 0.7s',
          }}
        >
          <div style={{ fontWeight: 700, fontSize: '1.3em', marginBottom: 18 }}>
            Do you really want to enter the Dark side of the force?
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              marginBottom: 20,
            }}
          >
            {showQ2OptA && (
              <button
                onClick={() => handleQ2Select(0)}
                style={{
                  background: selected2 === 0 ? '#d90429' : '#232326',
                  color: '#fff',
                  border: '2px solid #d90429',
                  borderRadius: 10,
                  fontWeight: 'bold',
                  fontSize: '1.05em',
                  padding: '0.7em 1.2em',
                  cursor: 'pointer',
                  boxShadow: selected2 === 0 ? '0 0 12px #d90429' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                a - YES
              </button>
            )}
            {showQ2OptB && (
              <button
                onClick={() => handleQ2Select(1)}
                style={{
                  background: selected2 === 1 ? '#d90429' : '#232326',
                  color: '#fff',
                  border: '2px solid #d90429',
                  borderRadius: 10,
                  fontWeight: 'bold',
                  fontSize: '1.05em',
                  padding: '0.7em 1.2em',
                  cursor: 'pointer',
                  boxShadow: selected2 === 1 ? '0 0 12px #d90429' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                b - YES
              </button>
            )}
          </div>
          {selected2 !== null && (
            <button
              onClick={handleQ2Next}
              style={{
                marginTop: 12,
                background: '#d90429',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '0.8em 2.1em',
                fontWeight: 'bold',
                fontSize: '1.1em',
                cursor: 'pointer',
                boxShadow: '0 0 18px #d90429',
                letterSpacing: 1,
                transition: 'background 0.2s, transform 0.2s',
              }}
            >
              Enter
            </button>
          )}
        </div>
      )}

      {/* Side Pop for Q2 */}
      {showSidePop && step === 'q2' && (
        <div
          style={{
            position: 'fixed',
            right: 40,
            bottom: 60,
            background: '#18181b',
            color: '#d90429',
            fontWeight: 700,
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '1.18rem',
            borderRadius: 16,
            boxShadow: '0 0 18px #d90429',
            padding: '1.2em 2em',
            zIndex: 10000,
            animation: 'fadeIn 0.8s',
            pointerEvents: 'none',
          }}
        >
          HAHA you have no other choice other than entering the dark side
        </div>
      )}

      {/* Final Enter to Temple */}
      {step === 'done' && (
        <div
          style={{
            background: 'rgba(24,24,27,0.95)',
            borderRadius: 18,
            boxShadow: '0 0 32px #d90429',
            padding: '2.2em 2.6em',
            color: '#fff',
            textAlign: 'center',
            fontSize: '1.35rem',
            fontWeight: 700,
            animation: 'fadeIn 0.7s',
          }}
        >
          <div style={{ marginBottom: 24 }}>
            Welcome to the Dark Side... <br />
            <span style={{ color: '#d90429', fontSize: '1.1em' }}>
              Enter the Sith Temple!
            </span>
          </div>
          <button
            onClick={handleFinalEnter}
            style={{
              background: '#d90429',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '1em 2.5em',
              fontWeight: 'bold',
              fontSize: '1.2em',
              cursor: 'pointer',
              boxShadow: '0 0 18px #d90429',
              letterSpacing: 1,
              transition: 'background 0.2s, transform 0.2s',
            }}
          >
            ENTER
          </button>
        </div>
      )}

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.96);}
            to { opacity: 1; transform: scale(1);}
          }
        `}
      </style>
    </div>
  )
}
