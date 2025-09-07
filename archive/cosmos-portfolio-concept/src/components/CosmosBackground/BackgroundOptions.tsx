// // BACKGROUND DESIGN OPTIONS - Copy and paste any of these into CosmosBackground.tsx

// // OPTION 1: Pure Black (Currently Active)
// // - Solid black background
// // - Twinkling white stars
// // - Subtle edge vignette

// // OPTION 2: Deep Space Gradient
// const Option2_DeepSpaceGradient = () => (
//   <div className="fixed inset-0 z-0">
//     {/* Deep space gradient */}
//     <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
    
//     {/* Stars canvas */}
//     <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    
//     {/* Minimal accent spots */}
//     <div className="absolute top-20 right-20 w-32 h-32 bg-blue-500 opacity-5 rounded-full blur-3xl" />
//     <div className="absolute bottom-20 left-20 w-24 h-24 bg-cyan-400 opacity-3 rounded-full blur-2xl" />
//   </div>
// );

// // OPTION 3: Matrix/Tech Style
// const Option3_MatrixStyle = () => (
//   <div className="fixed inset-0 z-0">
//     {/* Pure black with subtle grid pattern */}
//     <div className="absolute inset-0 bg-black" />
//     <div 
//       className="absolute inset-0 opacity-5"
//       style={{
//         backgroundImage: `
//           linear-gradient(rgba(100, 255, 218, 0.1) 1px, transparent 1px),
//           linear-gradient(90deg, rgba(100, 255, 218, 0.1) 1px, transparent 1px)
//         `,
//         backgroundSize: '50px 50px'
//       }}
//     />
    
//     {/* Stars canvas */}
//     <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
//   </div>
// );

// // OPTION 4: Minimal Cosmos
// const Option4_MinimalCosmos = () => (
//   <div className="fixed inset-0 z-0">
//     {/* Very dark gradient */}
//     <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black" />
    
//     {/* Stars canvas */}
//     <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    
//     {/* Single subtle glow */}
//     <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-cosmic-accent opacity-2 rounded-full blur-3xl" />
//   </div>
// );

// // OPTION 5: Starfield Focus
// const Option5_StarfieldFocus = () => (
//   <div className="fixed inset-0 z-0">
//     {/* Pure black */}
//     <div className="absolute inset-0 bg-black" />
    
//     {/* Multiple star layers */}
//     <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    
//     {/* Add more stars with different sizes */}
//     <div className="absolute inset-0">
//       {Array.from({ length: 100 }).map((_, i) => (
//         <div
//           key={i}
//           className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
//           style={{
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`,
//             animationDelay: `${Math.random() * 3}s`,
//             opacity: Math.random() * 0.8 + 0.2
//           }}
//         />
//       ))}
//     </div>
//   </div>
// );

// // OPTION 6: Professional Dark
// const Option6_ProfessionalDark = () => (
//   <div className="fixed inset-0 z-0">
//     {/* Professional dark gradient */}
//     <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black" />
    
//     {/* Stars canvas */}
//     <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    
//     {/* Subtle corner accents */}
//     <div className="absolute top-0 left-0 w-64 h-64 bg-cosmic-accent opacity-5 rounded-full blur-3xl" />
//     <div className="absolute bottom-0 right-0 w-48 h-48 bg-cosmic-blue opacity-3 rounded-full blur-2xl" />
//   </div>
// );

// export {
//   Option2_DeepSpaceGradient,
//   Option3_MatrixStyle,
//   Option4_MinimalCosmos,
//   Option5_StarfieldFocus,
//   Option6_ProfessionalDark
// };
